import { configureStore } from '@reduxjs/toolkit'
import { IReduxState } from './store.interface';
import { injectDispatch, injectSelector } from '@reduxjs/angular-redux';


export interface RootState {
}

const rootReducer = (state: RootState | undefined, action: any): RootState => {
  if(action.type === 'logout/updateLogout') {
    return {};
  }
    return state;
}

export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export const injectAppDispatch = injectDispatch.withTypes<AppDispatch>();
export const injectAppSelector = injectSelector.withTypes<RootState>();
