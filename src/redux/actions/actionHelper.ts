import { createAction } from 'redux-actions'
import _ from 'lodash'

const actionMap = {}

export const createActions = <T extends { [key: string]: Function, }>(
  obj: T,
  prefix: string = ''
) => {
  const objProxy: {[K in Extract<keyof T, string>]: any} = {} as any;
  // 
  Object.keys(obj).forEach(e => {
    // 判断是否是一个函数
    if (_.isFunction(obj[e])) {
      // 如果actionMap中已经存在这个函数就抛出错误
      if (actionMap.hasOwnProperty(e)) {
        throw new Error(`action - '${e}' is duplicated`)
      } else {
        // 0表示action存在，但尚未和任何reducer关联。
        actionMap[e] = 0
      }
      // 设置actionType的值为
      const actionType = `${prefix}_${e}`
      // @ts-ignore
      // createAction(type, payloadCreator)
      // payloadCreater是一个函数
      objProxy[e] = createAction(actionType, obj[e].bind(objProxy))
      // 返回actionType值,对应takeLatest的第一个参数pattern(为函数时)，详细看笔记
      objProxy[e].toString = () => actionType
    }
  })
  return objProxy
}
