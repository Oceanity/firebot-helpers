import { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import { HttpServerManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/http-server-manager";

export let effectManager: ScriptModules["effectManager"];
export let effectRunner: ScriptModules["effectRunner"];
export let eventManager: ScriptModules["eventManager"];
export let httpServer: HttpServerManager;
export let integrationManager: ScriptModules["integrationManager"];
export let jsonDb: unknown;
export let logger: ScriptModules["logger"];
export let twitchApi: ScriptModules["twitchApi"];
export let twitchChat: ScriptModules["twitchChat"];
export let utils: ScriptModules["utils"];
export let variableManager: ScriptModules["replaceVariableManager"];

export function initModules(scriptModules: ScriptModules) {
  effectManager = scriptModules.effectManager;
  effectRunner = scriptModules.effectRunner;
  eventManager = scriptModules.eventManager;
  httpServer = scriptModules.httpServer;
  integrationManager = scriptModules.integrationManager;
  jsonDb = scriptModules.JsonDb;
  logger = scriptModules.logger;
  twitchApi = scriptModules.twitchApi;
  twitchChat = scriptModules.twitchChat;
  utils = scriptModules.utils;
  variableManager = scriptModules.replaceVariableManager;
}
