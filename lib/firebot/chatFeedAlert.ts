import { logger, effectManager } from "./modules";
import { getErrorMessage } from "../string";

export async function chatFeedAlert(message: string) {
  try {
    //@ts-expect-error ts2339
    const effect = effectManager.getEffectById("firebot:chat-feed-alert");
    if (!effect || !effect.onTriggerEvent) {
      throw new Error("Unable to trigger chat feed alert");
    }
    await effect.onTriggerEvent({
      effect: {
        message,
      },
      trigger: {
        type: "custom_script",
        metadata: {
          username: "script",
        },
      },
    });
  } catch (error) {
    logger.error(getErrorMessage(error), error);
    throw error;
  }
}
