import React from 'react';
import { HashRouter, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Login from '../pages/login/login'
import NewsSandBox from '../pages/sandBox/newsSandBox';
export default function index() {
  return (
    <HashRouter>
      {/* react-router6用Routes代替Switch */}
      <Routes>
          <Route path='/login' element={<Login />} />
          {/* react-router-dom v6需要加上通配符*才可以匹配到子组件 */}
          <Route path='/*' element={localStorage.getItem('token') ? <NewsSandBox /> : <Navigate to='/login'/>} />
      </Routes>
    </HashRouter>
  )
}



// interface IRouter {
//     title: String,
//     path: String,
//     component?: ReactNode,
//     children?: IRouter[],
// }

// const router: IRouter[] = [
//     {
//         path: '/login',
//         title: '登录',
//         component: <Login/>,
//     }
// ];