import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./home/home";
import UserList from "./userManage/userList";
import RoleList from "./rightMange/roleList";
import RightList from "./rightMange/rightList";
import NoPermission from "./noPermission/noPermission";

const LocalRouteMap = {
    '/home': <Home />,
    '/user-manage/list': <UserList />,
    '/right-manage/list': <RightList />,

}
const menuList = [
  {
    key: '/home',
    roleId: 1,
  },
  // {
  //   key: '/user-manage',
  //   title: '用户管理',
  //   roleId: 2,
  // },
  {
    key: '/user-manage/list',
    roleId: 2,
  },
  // {
  //   key: '/right-manage',
  //   title: '权限管理',
  //   roleId: 2,
  // },
  {
    key: '/right-manage/list',
    roleId: 2,
  }
]

export default function newsRouter() {
  const role = 2;
  return (
    <div>
      <Routes>
        {
          menuList.map((item) => 
              item.roleId === role && <Route path={item.key} element={LocalRouteMap[item.key]}></Route>
          )
        }
        {/* <Route path='/home' element={<Home />}></Route>
        <Route path='/user-manage/list' element={<UserList />}></Route>
        <Route path='/right-manage/role' element={<RoleList />}></Route>
        <Route path='/right-manage/right' element={<RightList />}></Route> */}
        <Route path="/" element={<Navigate to='/home'/>}></Route>
        <Route path="*" element={< NoPermission/>}></Route>
      </Routes>
    </div>
  )
}
