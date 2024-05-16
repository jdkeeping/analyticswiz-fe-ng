export interface AwsSettings {
  appName?: string;
  version?: string;
  Pinpoint?: AwsPinpointConfig;
  Cognito?: AwsCognitoConfig;
}

export interface AwsPinpointConfig {
  appId?: string;
  region?: string;
}

export interface AwsCognitoConfig {
  userPoolId?: string;
  userPoolClientId?: string;
  identityPoolId?: string;
  loginWith?: {
    oath?: {
      domain?: string;
      scope?: string[];
      redirectSignIn?: string[];
      redirectSignOut?: string[];
      responseType?: string;
    }
  }
}
