export interface ApiError {
  errorName?: string;
  error?: any;
  message?: string;
  path?: string;
  requestId?: string;
  statusCode?: number;
  timestamp?: string;
  action?: string;
  parameters?: string;
}

export interface ApiErrorDetail {
  error: string;
  message: string;
  statusCode: number;
}
