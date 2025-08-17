import { logger } from "../firebot";

export async function remoteVersionCheck(
  localVersion: string,
  remotePackageUrl: string
) {
  let remoteVersion: string | null = null;
  let remoteIsNewer = false;

  try {
    const githubPackageResponse = await fetch(remotePackageUrl);

    if (!githubPackageResponse.ok) {
      throw new Error(
        `Fetching remote package.json returned Status ${githubPackageResponse.status} ${githubPackageResponse.statusText}`
      );
    }

    const githubPackage = await githubPackageResponse.json();

    if (!!githubPackage.error) {
      throw new Error(githubPackage.error);
    }

    remoteVersion = githubPackage.version;

    if (!remoteVersion) {
      throw new Error(
        "Fetched package file does not have a `version` attribute."
      );
    }

    const splitLocal = localVersion.split(".");
    const splitRemote = remoteVersion.split(".");

    for (let i = 0; i < Math.min(splitLocal.length, splitRemote.length); i++) {
      // Ensure that both versions have the same number of sections
      if (!splitLocal[i]) splitLocal[i] = "0";
      if (!splitRemote[i]) splitRemote[i] = "0";

      // Check numerically and alphabetically
      const localInt = parseInt(splitLocal[i]);
      const remoteInt = parseInt(splitRemote[i]);

      if (remoteInt > localInt || splitRemote[i] > splitLocal[i]) {
        remoteIsNewer = true;
        break;
      } else if (remoteInt < localInt || splitRemote[i] < splitLocal[i]) {
        break;
      }
    }
  } catch (error) {
    logger.error(
      `Error checking remote package version at ${remotePackageUrl}`,
      error
    );
  }

  return remoteIsNewer;
}
