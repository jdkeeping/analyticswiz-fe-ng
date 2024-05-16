/**
 * ID: bh-user-device
 * Name: BH User Device
 * Description: Model object used to capture user's device properties
 * Version: 2
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2022-05-25 - MW - v2: Fixed naming of id, os, osVersion
 */
export interface UserDevice {
    id?: string;
    os?: string;
    osVersion?: string;
    screenWidth?: number;
    screenHeight?: number;
    viewportWidth?: number;
    viewportHeight?: number;
    isNarrowViewport?: boolean;
    orientation?: string;
    isLandscape?: boolean;
    isPortrat?: boolean;
    isMobileWidth?: boolean;
    isMobileDevice?: boolean;
    version?: string;
    browser?: string;
    majorVersion?: number;
    cookiesEnabled?: boolean;
    prefersDark?: boolean;
    language?: string;
    isNativeApp?: boolean;
}

/**
 * Web browser model to capture user's web browser properties.
 */
export interface BrowserInfo {
    browser?: string;
    version?: string;
    majorVersion?: number;
    cookiesEnabled?: boolean;
}
