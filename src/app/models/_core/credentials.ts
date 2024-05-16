/**
 * ID: bh-credentials
 * Name: BH Credentials
 * Description: Payload model for interacting with the login API endpoint
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 */

export interface Credentials {
    userId?: string;
    password?: string;
}
