// 参考https://github.com/redux-saga/redux-saga/issues/697
import { Action } from 'redux-actions'
import { Dispatch } from 'redux'
const createExposedPromise = () => {
  const deferred = {}
  // $FlowFixMe
  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  })
  return [promise, deferred];
}
// 创建自己的redux middleware,参考https://redux.js.org/advanced/middleware
// $FlowFixMe
export default () => (next) => (action) => {
  // 跳过不以“Saga”结尾的action
  if (!action.type.endsWith('Saga')) {
    return next(action);
  };
  const [promise, deferred] = createExposedPromise();
  const newActions = { ...action, deferred };
  next(newActions);
  return promise;
}
