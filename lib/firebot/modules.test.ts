import { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import { initModules, logger, httpServer } from "./modules";

describe("firebot/modules", () => {
  let testModules: ScriptModules;

  beforeEach(() => {
    testModules = {
      logger: {} as any,
      effectRunner: {} as any,
      effectManager: {} as any,
      eventManager: {} as any,
      replaceVariableManager: {} as any,
      integrationManager: {} as any,
      JsonDb: {} as any,
      utils: {} as any,
      httpServer: {} as any,
    } as ScriptModules;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not have global modules on startup", () => {
    expect(logger).toBeUndefined();
    expect(httpServer).toBeUndefined();
  });

  it("properly sets the global modules", () => {
    expect(logger).toBeUndefined();
    expect(httpServer).toBeUndefined();

    initModules(testModules);

    expect(logger).toEqual(testModules.logger);
    expect(httpServer).toEqual(testModules.httpServer);
  });
});
