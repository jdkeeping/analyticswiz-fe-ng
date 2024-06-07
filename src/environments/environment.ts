// *** BUMP THIS VERSION ONLY WHEN UPDATING STARTER TEMPLATE ***
// BH Starter Template Version: 8.0.0

export const environment = {
  // Environment Name
  env: 'DEV',

  // Is Production Environment?
  production: false,

  // App Name/ID
  appName: 'LABMOUSE',

  // App Description (full name)
  appDescription: 'LabMouse',

  // App Version Number
  appVersion: '8.0.0',

  // App URL Scheme
  appUrlScheme: 'labmouse:',

  // Web URL
  webUrl: 'https://dev.labmouse.apps.baystatehealth.org',

  // App's REST Service API Root URL
  apiUrl: 'https://mobiledev.api.baystatehealth.org/shuttleme',

  // AWS Cognito API Root URL
  awsCognitoUrl: 'https://bh-dev-auth.auth.us-east-1.amazoncognito.com',

  // AWS Cognito Client ID for Auth (Needs client ID specific to app)
  awsCognitoClientId: '2qe042l28n359l6ugutf4fn51n',

  // Using SSO Authentication
  ssoEnabled: false,

  // App's Uploaded Files Root URL
  filesUrl: 'https://dev.labmouse.apps.baystatehealth.org',

  // Verlocker API URL
  verlockerUrl: 'https://mobiledev.api.baystatehealth.org/verlocker',

  // BH AppStore Deep Link URL
  appstoreUrl: 'https://mobile.baystatehealth.org/labmouse/',

  // Reset password link URL
  resetPwdUrl: 'https://baystatehealth.service-now.com/nav_to.do?uri=%2F$pwd_reset.do%3Fsysparm_url%3Dpassword_reset',

  // Change password security questions link URL
  changePwdQuestionsUrl: 'https://baystatehealth.service-now.com/b_sp?id=pwd_reset_enrollment',

  // Set theme preference: user, light, dark
  // 'user' option will allow user to select theme preference (recommended).
  // 'light' option locks app into light mode, and user cannot change it
  // 'dark' option locks app into dark mode, and user cannot change it
  theme: 'user',

  // Store token in local storage to remember user?
  // Patient/Secure Apps should set this to false
  storeToken: true,

  // Allow Biometrics to login
  // This will allow users to login using biometrics (fingerprint, Touch ID or Face ID)
  allowBiometrics: false,

  // Require timeout
  // Patient/Secure Apps will require that timeout is enabled
  // On timeout, user will be bumped
  requireTimeout: false,

  // Timeout threshold
  // Determine the number of seconds when timeout will occur
  // 15 minutes = 900000
  timeoutThreshold: 900000,

  // Enable Multi-language support
  // Shows the Select Language feature on login page, user menu, and account page
  // Update translator service with support languages
  enableMultiLanguageSupport: true,

};
