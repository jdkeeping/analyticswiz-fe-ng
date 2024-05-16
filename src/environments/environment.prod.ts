// *** BUMP THIS VERSION ONLY WHEN UPDATING STARTER TEMPLATE ***
// BH Starter Template Version: 8.0.0

export const environment = {
  // Environment Name
  env: 'PROD',

  // Is Production Environment?
  production: true,

  // App Name/ID
  appName: 'LABSIGHT',

  // App Description (full name)
  appDescription: 'LabSight',

  // App Version Number
  appVersion: '8.0.0',

  // App URL Scheme
  appUrlScheme: 'labsight:',

  // Web URL
  webUrl: 'https://dev.labsight.apps.baystatehealth.org',

  // App's REST Service API Root URL
  apiUrl: 'https://mobiledev.api.baystatehealth.org/shuttleme',

  // AWS Cognito API Root URL
  awsCognitoUrl: 'https://bh-prod-auth.auth.us-east-1.amazoncognito.com',

  // AWS Cognito Client ID for Auth (Needs client ID specific to app)
  awsCognitoClientId: 'e6iej4hm94bmncctumog1ocr0',

  // Using SSO Authentication
  ssoEnabled: false,

  // App's Uploaded Files Root URL
  filesUrl: 'https://worktips.apps.baystatehealth.org',

  // Verlocker API URL
  verlockerUrl: 'https://mobileprod.api.baystatehealth.org/verlocker',

  // BH AppStore Deep Link URL
  appstoreUrl: 'https://mobile.baystatehealth.org/labsight/',

  // Reset password link URL
  resetPwdUrl: 'https://baystatehealth.service-now.com/nav_to.do?uri=%2F$pwd_reset.do%3Fsysparm_url%3Dpassword_reset',

  // Change password security questions link URL
  changePwdQuestionsUrl: 'https://baystatehealth.service-now.com/b_sp?id=pwd_reset_enrollment',

  // Set theme preference: user, light, dark
  // 'user' option will allow user to select theme preference (recommended).
  // 'light' and 'dark' will force their respective themes and not allow user to change.
  theme: 'user',

  // Store token in local storage to remember user?
  // Patient/Secure Apps should set this to false
  storeToken: true,

  // Allow Biometrics to login
  // This will allow users to login using biometrics (fingerprint, Touch ID or Face ID)
  allowBiometrics: false,

  // Require PIN code enabled on device
  // Patient/Secure Apps will require that the PIN code is enabled
  // If PIN is not in use, app will block user
  requirePin: true,

  // Require timeout
  // Patient/Secure Apps will require that timeout is enabled
  // On timeout, user will be bumped
  requireTimeout: false,

  // Timeout threshold
  // Determine the number of seconds when timeout will occur
  // 15 minutes = 900000
  timeoutThreshold: 900000,

};
