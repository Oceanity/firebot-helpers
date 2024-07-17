import { Trigger } from "firebot";
import { getTriggerSource } from "./get-trigger-source";

describe("getTriggerSource", () => {
  let trigger: Trigger;

  beforeEach(() => {
    trigger = {
      type: "manual",
      metadata: {
        userCommand: {
          trigger: "test",
          args: [],
        },
        username: "test",
      },
    };
  });

  it("returns expected string value for user command", () => {
    let triggerName = "!test";

    trigger.type = "command";
    trigger.metadata.userCommand = {
      trigger: triggerName,
      args: [],
    };

    expect(getTriggerSource(trigger)).toContain(triggerName);
  });
});
