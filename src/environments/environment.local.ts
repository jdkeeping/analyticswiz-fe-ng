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
  filesUrl: 'https://dev.worktips.apps.baystatehealth.org',

  // Verlocker API URL
  verlockerUrl: 'https://mobiledev.api.baystatehealth.org/verlocker',

  // BH AppStore Deep Link URL
  appstoreUrl: 'https://mobile.baystatehealth.org/appstore/',

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

  // Home Class ID (must have an active corresponding class container record)
  homeClassId: '94c142d0-7872-4a6e-9b6d-d2e9384bce86',

  // Home Class > Root Category ID (must have an active corresponding category container record)
  homeRootCategoryId: 'd8a56a8e-46af-462a-a85a-2d3f5f621ea1',

  // Home > Root > Events App ID (must have an active corresponding application container record)
  rootEventsAppId: '20541fbb-543f-4116-904f-1a90476a613a',

  // Home > Root > Events App > Tab ID (must have an active corresponding tab container record)
  rootEventsTabId: 'd7441ecc-90ec-4866-9a43-b42cc1d4753b',

  // Home > Apps (must have an active corresponding app container record)
  appsId: 'c3d00061-434f-48af-80ff-702c817239fa',

  // Tango Embed Base URL
  tangoEmbedBaseUrl: 'https://app.tango.us/app/embed/',

  // Tango Website URL
  tangoWebBaseUrl: 'https://app.tango.us/app/workflow/',

  //boot camp url on home page
  techTalksUrl: '/tabs/apps/a5cbfb70-83ba-4adc-87d4-bfe14396866e',

};
