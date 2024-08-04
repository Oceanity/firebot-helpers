import * as fs from "fs/promises";
import { resolve } from "path";

const root = resolve(__dirname, "../");

async function main() {
  const packagePath = resolve(root, "./package.json");
  const packageDestination = resolve(root, "./dist/package.json");

  await fs.copyFile(packagePath, packageDestination);
}

main();
