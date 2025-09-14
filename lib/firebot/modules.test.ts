import { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";

describe("firebot/modules", () => {
  let testModules: ScriptModules;

  beforeEach(() => {
    testModules = {
      effectManager: { effectManagerMethod: () => {} } as any,
      effectRunner: { effectRunnerMethod: () => {} } as any,
      eventManager: { eventManagerMethod: () => {} } as any,
      eventFilterManager: { eventFilterMethod: () => {} } as any,
      httpServer: { httpServerMethod: () => {} } as any,
      integrationManager: { integrationManagerMethod: () => {} } as any,
      JsonDb: { JsonDbMethod: () => {} } as any,
      logger: { loggerMethod: () => {} } as any,
      notificationManager: { notificationManagerMethod: () => {} } as any,
      replaceVariableManager: { replaceVariableManagerMethod: () => {} } as any,
      twitchApi: { twitchApiMethod: () => {} } as any,
      twitchChat: { twitchChatMethod: () => {} } as any,
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

  it("properly initializes effectManager", async () => {
    await testModuleInit("effectManager");
  });

  it("properly initializes effectRunner", async () => {
    await testModuleInit("effectRunner");
  });

  it("properly initializes eventManager", async () => {
    await testModuleInit("eventManager");
  });

  it("properly initializes eventFilterManager", async () => {
    await testModuleInit("eventFilterManager");
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

  it("properly initializes notificationManager", async () => {
    await testModuleInit("notificationManager");
  });

  it("properly initializes replaceVariableManager", async () => {
    await testModuleInit("replaceVariableManager");
  });

  it("properly initializes twitchApi", async () => {
    await testModuleInit("twitchApi");
  });

  it("properly initializes twitchChat", async () => {
    await testModuleInit("twitchChat");
  });

  it("properly initializes utils", async () => {
    await testModuleInit("utils");
  });
});
