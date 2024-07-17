import { Trigger } from "firebot";

export const getTriggerSource = (trigger: Trigger): string => {
  //logger.info(JSON.stringify(trigger));
  const { metadata, type } = trigger;
  switch (type) {
    case "command":
      return `Command: ${metadata.userCommand?.trigger}`;
    case "custom_script":
      return `Custom Script: ${metadata.userCommand?.trigger}`;
    case "startup_script":
      return `Startup Script: ${metadata.userCommand?.trigger}`;
    case "api":
      return `API: ${metadata.userCommand?.trigger}`;
    case "event":
      return `Event: ${metadata.event?.name}`;
    case "hotkey":
      return `Hotkey: ${metadata.hotkey}`;
    case "timer":
      return `Timer: ${metadata.userCommand?.trigger}`;
    case "counter":
      return `Counter: ${metadata.counter?.name}`;
    case "preset":
      return `Preset: ${metadata.userCommand?.trigger}`;
    case "quick_action":
      return `Quick Action: ${metadata.userCommand?.trigger}`;
    case "manual":
      return `Manual: ${metadata.userCommand?.trigger}`;
    default:
      return "Unknown Trigger Type";
  }
};
