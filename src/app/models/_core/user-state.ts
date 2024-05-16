import { AuthState } from 'src/app/models/_core/auth-state';
import { User } from 'src/app/models/user';
import { ThemeOption } from './theme-option';
/**
 * ID: bh-user-state
 * Name: BH User State
 * Type: Model
 * Description: Model object used to capture user's current state and preferences
 * Version: 2
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-13 - MW - v1: Initial dev
 * 2022-05-27 - MW - v2: Added theme preference
 */
export interface UserState {
    userId?: string;
    userName?: string;
    authUser?: User;
    authState?: AuthState;
    environment?: any;
    firstTimeViewed?: boolean;
    lastLoggedIn?: string;
    sessionAppVersion?: string;
    sessionRefreshed?: string;
    passwordData?: string;

    // App-specific preferences
    theme?: ThemeOption;
    useBiometrics?: boolean;
    invitedBiometrics?: boolean;
}
