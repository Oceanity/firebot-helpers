import { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";

describe("firebot/modules", () => {
  let testModules: ScriptModules;

  beforeEach(() => {
    testModules = {
      childProcess: { childProcessMethod: () => {} } as any,
      commandManager: { commandManagerMethod: () => {} } as any,
      conditionManager: { conditionManagerMethod: () => {} } as any,
      counterManager: { counterManagerMethod: () => {} } as any,
      currencyDb: { currencyDbMethod: () => {} } as any,
      currencyManager: { currencyManagerMethod: () => {} } as any,
      customVariableManager: { customVariableManagerMethod: () => {} } as any,
      effectManager: { effectManagerMethod: () => {} } as any,
      effectRunner: { effectRunnerMethod: () => {} } as any,
      eventFilterFactory: { eventFilterFactoryMethod: () => {} } as any,
      eventFilterManager: { eventFilterMethod: () => {} } as any,
      eventManager: { eventManagerMethod: () => {} } as any,
      firebotRolesManager: { firebotRolesManagerMethod: () => {} } as any,
      frontendCommunicator: { frontendCommunicatorMethod: () => {} } as any,
      fs: { fsMethod: () => {} } as any,
      gameManager: { gameManagerMethod: () => {} } as any,
      howler: { howlerMethod: () => {} } as any,
      httpServer: { httpServerMethod: () => {} } as any,
      integrationManager: { integrationManagerMethod: () => {} } as any,
      JsonDb: { JsonDbMethod: () => {} } as any,
      logger: { loggerMethod: () => {} } as any,
      moment: { momentMethod: () => {} } as any,
      notificationManager: { notificationManagerMethod: () => {} } as any,
      overlayWidgetConfigManager: {
        overlayWidgetConfigManagerMethod: () => {},
      } as any,
      overlayWidgetsManager: { overlayWidgetsManagerMethod: () => {} } as any,
      path: { pathMethod: () => {} } as any,
      quotesManager: { quotesManagerMethod: () => {} } as any,
      replaceVariableFactory: { replaceVariableFactoryMethod: () => {} } as any,
      replaceVariableManager: { replaceVariableManagerMethod: () => {} } as any,
      twitchApi: { twitchApiMethod: () => {} } as any,
      uiExtensionManager: { uiExtensionManagerMethod: () => {} } as any,
      utils: { utilsMethod: () => {} } as any,
    } as ScriptModules;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  const testModuleInit = async <K extends keyof ScriptModules>(key: K) => {
    const modules = await import("./modules");

    expect(modules[key as keyof typeof modules]).toBeUndefined();

    modules.initModules(testModules);

    expect(modules[key as keyof typeof modules]).not.toBeUndefined();
    expect(modules[key as keyof typeof modules]).toEqual(testModules[key]);
  };

  it("has undefined modules before initialization", async () => {
    const modules = await import("./modules");

    const hasUndefinedModules = Object.values(modules).some(
      (v) => v === undefined
    );

    expect(hasUndefinedModules).toEqual(true);
  });

  it("has no undefined modules after initialization", async () => {
    const modules = await import("./modules");

    modules.initModules(testModules);

    const hasUndefinedModules = Object.values(modules).some(
      (v) => v === undefined
    );

    expect(hasUndefinedModules).toEqual(false);
  });

  it("properly initializes childProcess", async () => {
    await testModuleInit("childProcess");
  });

  it("properly initializes commandManager", async () => {
    await testModuleInit("commandManager");
  });

  it("properly initializes conditionManager", async () => {
    await testModuleInit("conditionManager");
  });

  it("properly initializes counterManager", async () => {
    await testModuleInit("counterManager");
  });

  it("properly initializes currencyDb", async () => {
    await testModuleInit("currencyDb");
  });

  it("properly initializes currencyManager", async () => {
    await testModuleInit("currencyManager");
  });

  it("properly initializes customVariableManager", async () => {
    await testModuleInit("customVariableManager");
  });

  it("properly initializes effectManager", async () => {
    await testModuleInit("effectManager");
  });

  it("properly initializes effectRunner", async () => {
    await testModuleInit("effectRunner");
  });

  it("properly initializes eventFilterFactory", async () => {
    await testModuleInit("eventFilterFactory");
  });

  it("properly initializes eventFilterManager", async () => {
    await testModuleInit("eventFilterManager");
  });

  it("properly initializes eventManager", async () => {
    await testModuleInit("eventManager");
  });

  it("properly initializes firebotRolesManager", async () => {
    await testModuleInit("firebotRolesManager");
  });

  it("properly initializes frontendCommunicator", async () => {
    await testModuleInit("frontendCommunicator");
  });

  it("properly initializes fs", async () => {
    await testModuleInit("fs");
  });

  it("properly initializes gameManager", async () => {
    await testModuleInit("gameManager");
  });

  it("properly initializes howler", async () => {
    await testModuleInit("howler");
  });

  it("properly initializes httpServer", async () => {
    await testModuleInit("httpServer");
  });

  it("properly initializes integrationManager", async () => {
    await testModuleInit("integrationManager");
  });

  it("properly initializes JsonDb", async () => {
    await testModuleInit("JsonDb");
  });

  it("properly initializes logger", async () => {
    await testModuleInit("logger");
  });

  it("properly initializes moment", async () => {
    await testModuleInit("moment");
  });

  it("properly initializes notificationManager", async () => {
    await testModuleInit("notificationManager");
  });

  it("properly initializes overlayWidgetConfigManager", async () => {
    await testModuleInit("overlayWidgetConfigManager");
  });

  it("properly initializes overlayWidgetsManager", async () => {
    await testModuleInit("overlayWidgetsManager");
  });

  it("properly initializes path", async () => {
    await testModuleInit("path");
  });

  it("properly initializes quotesManager", async () => {
    await testModuleInit("quotesManager");
  });

  it("properly initializes replaceVariableFactory", async () => {
    await testModuleInit("replaceVariableFactory");
  });

  it("properly initializes replaceVariableManager", async () => {
    await testModuleInit("replaceVariableManager");
  });

  it("properly initializes twitchApi", async () => {
    await testModuleInit("twitchApi");
  });

  it("properly initializes uiExtensionManager", async () => {
    await testModuleInit("uiExtensionManager");
  });

  it("properly initializes utils", async () => {
    await testModuleInit("utils");
  });
});
