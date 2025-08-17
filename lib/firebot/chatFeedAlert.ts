import { getErrorMessage } from "../string";
import { effectManager, logger } from "./modules";

export async function chatFeedAlert(message: string) {
  try {
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
      sendDataToOverlay: () => {},
      abortSignal: new AbortSignal(),
    });
  } catch (error) {
    logger.error(getErrorMessage(error), error);
    throw error;
  }
}
