/**
 * User model for identifying properties.
 * Used by login page and auth service.
 */
export interface User {
  userId?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  fullName?: string;
  isActive?: boolean;
  role?: 'USER' | 'ADMIN' | 'SYS_ADMIN';
  roles?: string[];
  lastLoginAt?: string;
  token?: string;
  CreatedByUser?: UserMeta;
  createdAt?: string;
  createdBy?: string;
  UpdatedByUser?: UserMeta;
  updatedAt?: string;
  updatedBy?: string;
  presentationMode?: boolean;
  authenticated?: boolean;
  hide?: boolean;
}

export interface UserMeta {
  userName?: string;
  firstName?: string;
  lastName?: string;
}

export interface IUser {
  id: string;
  email: string;
  createdAt?: Date;
}