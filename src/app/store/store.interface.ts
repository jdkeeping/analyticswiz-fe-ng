import { IAppDataSource } from "../models/datasource";
import { ISQLPayload } from "../models/general";

export interface IReduxState {
  authUser: any;
  logout: boolean;
  datasource: IAppDataSource;
  collections: string[];
  documents: Array<Record<string, unknown>>,
  sqlQuery: ISQLPayload;
}