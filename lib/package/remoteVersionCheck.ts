import { logger } from "../firebot";

export type RemoteVersionCheckResponse = {
  success: boolean;
  isRemoteNewer: boolean;
  localVersion: string;
  remoteVersion?: string;
};

export async function remoteVersionCheck(
  localVersion: string,
  remotePackageUrl: string
): Promise<RemoteVersionCheckResponse> {
  const result: RemoteVersionCheckResponse = {
    success: false,
    isRemoteNewer: false,
    localVersion,
  };

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

    result.remoteVersion = githubPackage.version;

    if (!result.remoteVersion) {
      throw new Error(
        "Fetched package file does not have a `version` attribute."
      );
    }

    const splitLocal = localVersion.split(".");
    const splitRemote = result.remoteVersion.split(".");

    for (let i = 0; i < Math.min(splitLocal.length, splitRemote.length); i++) {
      // Ensure that both versions have the same number of sections
      if (!splitLocal[i]) splitLocal[i] = "0";
      if (!splitRemote[i]) splitRemote[i] = "0";

      // Check numerically and alphabetically
      const localInt = parseInt(splitLocal[i]);
      const remoteInt = parseInt(splitRemote[i]);

      if (remoteInt > localInt || splitRemote[i] > splitLocal[i]) {
        result.isRemoteNewer = true;
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

  return result;
}
