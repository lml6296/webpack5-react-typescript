declare const SERVER_ENV: any
declare const SERVER_HOST: any
declare const TMX_ORG_ID: any
declare const TMX_FP_SERVER: string
declare const CLIENT_ID: any
declare const CLIENT_SECRET: any
declare const SENTRY_DSN: any
declare const BASE_NAME: string
declare const DEEP_LINK_PREVIEW_BASE: string
declare const FIREBASE_PROJECT_CONFIG_PRIMARY: string
declare const FIREBASE_PROJECT_CONFIG_SECONDARY: string


declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any,
}

declare interface HttpResponse<T> {
  code: string,
  message: string,
  data: T,
}

declare type SagaAction = {
  type: string,
  payload: any,
  deferred: {
    resolve: (value?: any) => void,
    reject: (reason?: any) => void,
  },
}


declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module 'redux-persist-seamless-immutable';
