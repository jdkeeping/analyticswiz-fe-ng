/**
 * ID: auth-state
 * Name: Auth State
 * Description: AuthState options used to determine user's current sign-in status
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 */
 export enum AuthState {
    LOGGED_IN,
    LOGGED_OUT,
    EXPIRED
  }