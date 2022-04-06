// // referr to https://github.com/redux-saga/redux-saga/issues/697
// import { Action } from 'redux-actions'
// import { Dispatch } from 'redux'
// const createExposedPromise = () => {
//   const deferred: any = {}

//   // $FlowFixMe
//   const promise = new Promise((resolve, reject) => {
//     deferred.resolve = resolve
//     deferred.reject = reject
//   })
//   return [promise, deferred]
// }

// // For create our own redux middleware, refer to https://redux.js.org/advanced/middleware
// // $FlowFixMe
// export default () => (next: Dispatch) => (action: Action<object>) => {
//   // Skip actions that don't end with "Saga"
//   if (!action.type.endsWith('Saga')) {
//     return next(action)
//   }

//   const [promise, deferred] = createExposedPromise()
//   const newActions = { ...action, deferred }

//   next(newActions)
//   return promise
// }
