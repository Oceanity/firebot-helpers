import { ensureDir } from "fs-extra";
import Fuse, { IFuseOptions } from "fuse.js";
import { JsonDB } from "node-json-db";
import { dirname, resolve } from "path";
import { JsonDb, logger, utils } from "../firebot";

type PatchResults<T> = {
  found: T;
  replaced: T;
};

export default class DbService {
  private readonly _path: string;
  private readonly _saveOnWrite: boolean;
  private readonly _humanReadable: boolean;
  private _ready: boolean = false;
  private _db?: JsonDB;

  public constructor(
    path: string,
    saveOnWrite: boolean = true,
    humanReadable: boolean = false
  ) {
    if (!path.includes(__dirname)) path = resolve(__dirname, path);
    this._path = path;
    this._saveOnWrite = saveOnWrite;
    this._humanReadable = humanReadable;
  }

  public get isReady(): boolean {
    return this._ready;
  }

  public async init(): Promise<JsonDB> {
    if (this._ready && !!this._db) return this._db;

    logger.info(`Creating Database file at ${this._path}...`);

    await ensureDir(dirname(this._path));

    // @ts-expect-error ts18046
    this._db = new JsonDb(this._path, this._saveOnWrite, this._humanReadable);

    this._ready = true;
    return this._db!;
  }

  public async getAsync<T>(
    route: string,
    defaults?: T | T[]
  ): Promise<T | undefined> {
    const db = await this.init();

    try {
      return db.getData(route) as T;
    } catch (err) {
      if (defaults) await db.push(route, defaults, true);
      logger.error(`Failed to get "${route}" from "${this._path}"`);
      return undefined;
    }
  }

  public async getRandom<T>(
    route: string,
    defaults?: T[]
  ): Promise<T | undefined> {
    const { getRandomInt } = utils;

    const choices = await this.getAsync<T[]>(route, defaults);

    if (!choices || !choices.length) {
      logger.error(`Failed to get random "${route}" from "${this._path}"`);
      return undefined;
    }

    const random = getRandomInt(0, choices.length - 1);
    return choices[random];
  }

  public async pushAsync<T>(
    route: string,
    data: T,
    override: boolean = false
  ): Promise<boolean> {
    try {
      const db = await this.init();

      await db.push(route, data, override);
      return true;
    } catch (err) {
      logger.error(`Could not push to "${route}" in "${this._path}"`);
      return false;
    }
  }

  public async mutate<T>(
    route: string,
    data: T,
    callback: (oldData: T, newData: T) => T,
    defaults: T
  ): Promise<boolean> {
    try {
      const existing = (await this.getAsync<T>(route, defaults)) ?? defaults;
      await this.pushAsync(route, callback(existing, data), true);
      return true;
    } catch (err) {
      logger.error(`Could not increment "${route}" in "${this._path}"`);
      return false;
    }
  }

  public async update<T>(
    route: string,
    search: string,
    replace: T,
    fuseOptions?: IFuseOptions<T>
  ): Promise<PatchResults<T> | undefined> {
    try {
      const db = await this.init();

      const data = await this._db?.getData(route);
      const fuse = new Fuse(data, fuseOptions);
      const results = fuse.search(search);

      if (!results) {
        logger.error("Could not find item to update");
        return undefined;
      }

      await db.push(`${route}[${results[0].refIndex}]`, replace);

      return {
        found: results[0].item,
        replaced: replace,
      };
    } catch (err) {
      logger.error(`Failed to update "${route}" in "${this._path}"`);
      return undefined;
    }
  }

  public async delete(route: string): Promise<boolean> {
    try {
      const db = await this.init();

      await db.delete(`${route}`);

      return true;
    } catch (err) {
      logger.error(`Failed to delete "${route}" in "${this._path}"`);
      return false;
    }
  }
}
