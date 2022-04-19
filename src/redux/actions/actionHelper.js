import { createAction } from "redux-actions";
import _ from "lodash";

// 创建actionMap映射关系
const actionMap = {};
// createActions接收两个参数
// 第一个是一个对象
// 第二个参数是一个字符串
export const createActions = (obj, prefix) => {
	const objProxy = {};
	Object.keys(obj).forEach((e) => {
		// 判断是否是一个函数
		if (_.isFunction(obj[e])) {
			// 如果actionMap中已经存在这个函数就抛出错误，说明这个action已经存在
			if (actionMap.hasOwnProperty(e)) {
				throw new Error(`action - '${e}' is duplicated`);
			} else {
				// 0表示action存在，但尚未和任何reducer关联。
				actionMap[e] = 0;
			}
			// 设置actionType的值
			const actionType = `${prefix}_${e}`;
			// createAction(type, payloadCreator)
			// type: action的type名
			// payloadCreator: 用来创建action对象中的payload中的值
			objProxy[e] = createAction(actionType, obj[e].bind(objProxy));
			// 返回actionType值,对应takeLatest的第一个参数pattern(为函数时)，详细看笔记
			objProxy[e].toString = () => actionType;
		}
	});
	console.log("actionMap", actionMap);
	console.log("objProxy", objProxy);
	return objProxy;
};
