/**
 * ID: bh-verlocker-data
 * Name: BH Verlocker Data
 * Description: Verlocker (version locker) checkVersion response properties
 * Version: 2
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2022-05-31 - MW - v2: Disabled JSON naming convention (per ESLint)
 */
 export interface VerlockerRecord {
  app?: string;
  android_install_link?: string;
  ios_install_link?: string;
  latest_version?: string;
  status?: string;
  update_description?: string;
  verstatus?: 'REQUESTED' | 'REQUIRED' | 'EXPIRED';
  x_status?: string;
}
