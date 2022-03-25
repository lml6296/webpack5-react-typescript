import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Spin } from 'antd';
import { connect } from 'react-redux';

import Home from "./home/home";
import UserList from "./userManage/userList";
import StaffList from "./userManage/staffList"
import RoleList from "./rightMange/roleList";
import RightList from "./rightMange/rightList";
import NoPermission from "./noPermission/noPermission";
import BlogList from './blogManage/blogList';

type Props = {
  isLoading: boolean,
  roleType: string,
}
const LocalRouteMap = {
  '/home': <Home />,
  '/user-manage/staff-list': <StaffList />,
  '/user-manage/user-list': <UserList />,
  '/right-manage/right-list' : <RightList/>,
  '/blog-manage/blog-list': <BlogList/>
}
const menuList = [
  // 首页
  {
    key: '/home',
    roleType: ['admin', 'checker'],
  },
  // 用户列表
  {
    key: '/user-manage/user-list',
    roleType: ['admin'],
  },
  // 员工列表
  {
    key: '/user-manage/staff-list',
    roleType: ['admin'],
  },
  // 权限列表
  {
    key: '/right-manage/right-list',
    roleType: ['admin'],
  },
  // 博客列表
  {
    key: '/blog-manage/blog-list',
    roleType: ['checker'],
  }
]

function newsRouter(props: Props) {
  return (
    <div>
      <Spin size="large" spinning={props.isLoading}>
      <Routes>
        {
          menuList.map((item) => 
              item.roleType.indexOf(props.roleType) !== -1 && <Route path={item.key} element={LocalRouteMap[item.key]} key={item.key}></Route>
          )
        }
        <Route path="/" element={<Navigate to='/home'/>}></Route>
        <Route path="*" element={<NoPermission />}></Route>
      </Routes>
      </Spin>
    </div>
  )
}

const mapStateToProps = ({
  loadingReducer: {isLoading},
  loginReducer: { roleType }
}) => {
  return {
    isLoading,
    roleType
  }
}

export default connect(mapStateToProps)(newsRouter);
