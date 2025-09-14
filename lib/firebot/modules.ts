import { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";

export let effectManager: ScriptModules["effectManager"];
export let effectRunner: ScriptModules["effectRunner"];
export let eventManager: ScriptModules["eventManager"];
export let eventFilterManager: ScriptModules["eventFilterManager"];
export let httpServer: ScriptModules["httpServer"];
export let integrationManager: ScriptModules["integrationManager"];
export let JsonDb: ScriptModules["JsonDb"];
export let logger: ScriptModules["logger"];
export let notificationManager: ScriptModules["notificationManager"];
export let replaceVariableManager: ScriptModules["replaceVariableManager"];
export let twitchApi: ScriptModules["twitchApi"];
export let twitchChat: ScriptModules["twitchChat"];
export let utils: ScriptModules["utils"];

export function initModules(scriptModules: ScriptModules) {
  effectManager = scriptModules.effectManager;
  effectRunner = scriptModules.effectRunner;
  eventManager = scriptModules.eventManager;
  eventFilterManager = scriptModules.eventFilterManager;
  httpServer = scriptModules.httpServer;
  integrationManager = scriptModules.integrationManager;
  JsonDb = scriptModules.JsonDb;
  logger = scriptModules.logger;
  notificationManager = scriptModules.notificationManager;
  twitchApi = scriptModules.twitchApi;
  twitchChat = scriptModules.twitchChat;
  utils = scriptModules.utils;
  replaceVariableManager = scriptModules.replaceVariableManager;
}
