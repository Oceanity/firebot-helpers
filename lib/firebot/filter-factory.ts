import { EventFilter } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-filter-manager";
import { objectWalkPath } from "../object";
import { ComparisonType, ComparisonTypes } from "./filter-constants";

export type FilterSettings = {
  comparisonType: string;
  value: any;
};

type EventData = {
  eventSourceId: string;
  eventId: string;
  eventMeta: Record<string, unknown>;
};

type FilterEvent = Omit<EventData, "eventMeta">;

type FilterConfig = {
  id: string;
  name: string;
  description: string;
  events: Array<FilterEvent>;
  eventMetaKey:
    | string
    | ((eventData: EventData, filterSettings: FilterSettings) => string);
  caseInsensitive?: boolean;
};

const TEXT_COMPARISON_TYPES: Array<ComparisonType> = [
  ComparisonTypes.IS,
  ComparisonTypes.IS_NOT,
  ComparisonTypes.CONTAINS,
  ComparisonTypes.DOESNT_CONTAIN,
  ComparisonTypes.STARTS_WITH,
  ComparisonTypes.DOESNT_START_WITH,
  ComparisonTypes.ENDS_WITH,
  ComparisonTypes.DOESNT_END_WITH,
  ComparisonTypes.MATCHES_REGEX_CS,
  ComparisonTypes.DOESNT_MATCH_REGEX_CS,
  ComparisonTypes.MATCHES_REGEX,
  ComparisonTypes.DOESNT_MATCH_REGEX,
];

const NUMBER_UNIQUE_COMPARISON_TYPES: Array<ComparisonType> = [
  ComparisonTypes.LESS_THAN,
  ComparisonTypes.LESS_THAN_OR_EQUAL_TO,
  ComparisonTypes.GREATER_THAN,
  ComparisonTypes.GREATER_THAN_OR_EQUAL_TO,
];

const NUMBER_COMPARISON_TYPES: Array<ComparisonType> = [
  ComparisonTypes.IS,
  ComparisonTypes.IS_NOT,
  ...NUMBER_UNIQUE_COMPARISON_TYPES,
];

const NUMBER_TEXT_COMPARISON_TYPES: Array<ComparisonType> = [
  ...TEXT_COMPARISON_TYPES,
  ...NUMBER_UNIQUE_COMPARISON_TYPES,
];

export function compareValue(
  comparisonType: string,
  expectedValue: unknown,
  actualValue: unknown
): boolean {
  switch (comparisonType) {
    case ComparisonTypes.IS:
      return actualValue === expectedValue;
    case ComparisonTypes.IS_NOT:
      return actualValue !== expectedValue;
    case ComparisonTypes.CONTAINS:
      return !!actualValue
        ?.toString()
        .includes(expectedValue?.toString() ?? "");
    case ComparisonTypes.DOESNT_CONTAIN:
      return !actualValue?.toString().includes(expectedValue?.toString() ?? "");
    case ComparisonTypes.STARTS_WITH:
      return !!actualValue
        ?.toString()
        .startsWith(expectedValue?.toString() ?? "");
    case ComparisonTypes.DOESNT_START_WITH:
      return !actualValue
        ?.toString()
        .startsWith(expectedValue?.toString() ?? "");
    case ComparisonTypes.ENDS_WITH:
      return !!actualValue
        ?.toString()
        .endsWith(expectedValue?.toString() ?? "");
    case ComparisonTypes.DOESNT_END_WITH:
      return !actualValue?.toString().endsWith(expectedValue?.toString() ?? "");
    case ComparisonTypes.LESS_THAN:
      return (actualValue as number) < (expectedValue as number);
    case ComparisonTypes.LESS_THAN_OR_EQUAL_TO:
      return (actualValue as number) <= (expectedValue as number);
    case ComparisonTypes.GREATER_THAN:
      return (actualValue as number) > (expectedValue as number);
    case ComparisonTypes.GREATER_THAN_OR_EQUAL_TO:
      return (actualValue as number) >= (expectedValue as number);
    case ComparisonTypes.MATCHES_REGEX: {
      const regex = new RegExp(expectedValue?.toString() ?? "", "gi");
      return regex.test(actualValue?.toString() ?? "");
    }
    case ComparisonTypes.DOESNT_MATCH_REGEX: {
      const regex = new RegExp(expectedValue?.toString() ?? "", "gi");
      return !regex.test(actualValue?.toString() ?? "");
    }
    case ComparisonTypes.MATCHES_REGEX_CS: {
      const regex = new RegExp(expectedValue?.toString() ?? "", "g");
      return regex.test(actualValue?.toString() ?? "");
    }
    case ComparisonTypes.DOESNT_MATCH_REGEX_CS: {
      const regex = new RegExp(expectedValue?.toString() ?? "", "g");
      return !regex.test(actualValue?.toString() ?? "");
    }
    default:
      return false;
  }
}

function getMetaKey(
  eventMetaKey: FilterConfig["eventMetaKey"],
  event: EventData,
  filter: FilterSettings
): string {
  if (typeof eventMetaKey === "function") {
    return eventMetaKey(event, filter);
  }
  return eventMetaKey;
}

export function createTextFilter({
  eventMetaKey,
  caseInsensitive,
  ...config
}: Omit<FilterConfig, "presetValues" | "allowIsNot">): Omit<
  EventFilter,
  "presetValues"
> {
  return {
    ...config,
    comparisonTypes: TEXT_COMPARISON_TYPES,
    valueType: "text",
    async predicate(filterSettings, eventData) {
      const { comparisonType, value } = filterSettings;
      const { eventMeta } = eventData;

      let eventValue =
        objectWalkPath(
          eventMeta,
          getMetaKey(eventMetaKey, eventData, filterSettings)
        ) ?? "";
      if (caseInsensitive) {
        eventValue = eventValue.toString().toLowerCase();
      }
      const filterValue =
        (caseInsensitive ? value?.toLowerCase() : value) ?? "";

      return compareValue(comparisonType, filterValue, eventValue);
    },
  };
}

export function createNumberFilter({
  eventMetaKey,
  ...config
}: Omit<FilterConfig, "caseInsensitive" | "presetValues" | "allowIsNot">): Omit<
  EventFilter,
  "presetValues" | "valueType"
> & {
  valueType: "number";
} {
  return {
    ...config,
    comparisonTypes: NUMBER_COMPARISON_TYPES,
    valueType: "number",
    async predicate(filterSettings, eventData) {
      const { comparisonType, value } = filterSettings;
      const { eventMeta } = eventData;

      const eventValue =
        objectWalkPath(
          eventMeta,
          getMetaKey(eventMetaKey, eventData, filterSettings)
        ) ?? 0;

      return compareValue(comparisonType, value, eventValue);
    },
  };
}

export function createTextOrNumberFilter({
  eventMetaKey,
  caseInsensitive,
  ...config
}: Omit<FilterConfig, "presetValues" | "allowIsNot">): Omit<
  EventFilter,
  "presetValues"
> {
  return {
    ...config,
    comparisonTypes: NUMBER_TEXT_COMPARISON_TYPES,
    valueType: "text",
    async predicate(filterSettings, eventData) {
      const { comparisonType, value } = filterSettings;
      const { eventMeta } = eventData;

      let eventValue =
        objectWalkPath(
          eventMeta,
          getMetaKey(eventMetaKey, eventData, filterSettings)
        ) ?? "";
      if (caseInsensitive) {
        eventValue = eventValue.toString().toLowerCase();
      }
      const filterValue =
        (caseInsensitive ? value?.toString()?.toLowerCase() : value) ?? "";
      return compareValue(comparisonType, filterValue, eventValue);
    },
  };
}
