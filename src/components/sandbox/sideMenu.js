import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from "antd";
import { connect } from 'react-redux';
import './index.css';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
const { Sider } = Layout;
const { SubMenu } = Menu;
// 菜单数据
const menuList = [
  {
    key: '/home',
    title: '首页',
    icon: <UserOutlined />,
    roleType: ['admin', 'checker'],
  },
  {
    key: '/user-manage',
    title: '用户管理',
    icon: <UserOutlined />,
    roleType: ['admin'],
    children: [
      {
        key: '/user-manage/staff-list',
        title: '员工列表',
        icon: <UserOutlined />,
        roleType: ['admin'],
      },
      {
        key: '/user-manage/user-list',
        title: '用户列表',
        icon: <UserOutlined />,
        roleType: ['admin'],
      }
    ]
  },
  {
    key: '/right-manage',
    title: '权限管理',
    icon: <UserOutlined />,
    roleType: ['admin'],
    children: [
      {
        key: '/right-manage/right-list',
        title: '权限列表',
        icon: <UserOutlined />,
        roleType: ['admin'],
      },
    ]
  },
  {
    key: '/blog-manage',
    title: '博客管理',
    icon: <UserOutlined />,
    roleType: ['checker'],
    children: [
      {
        key: '/blog-manage/blog-list',
        title: '博客列表',
        icon: <UserOutlined />,
        roleType: ['checker'],
      },
    ]
  },
]
function SideMenu (props) {
    const checkPagePermission = (item) => {
      return item.roleType.indexOf(props.roleType) !== -1;
    }
    // v6用useNavigate代替useHistory
    const navigate = useNavigate();
    const menuRender = (menuList) => {
      return menuList.map((item) => {
        if (item.children?.length>0 && checkPagePermission(item)) {
        // if (item.children?.length>0) {
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {menuRender(item.children)}
            </SubMenu>
          )
        }
        return checkPagePermission(item) && <Menu.Item key={item.key} icon={item.icon} onClick= {() => navigate(item.key)}>{item.title}</Menu.Item>
      })
    };
      // 
    const location = useLocation();
    const openKeys = ['/' + location.pathname.split('/')[1]];
    return (
      <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
        <div style={{display: 'flex', height: '100%', 'flexDirection': 'column'}}>
          <div className="logo">博客管理平台</div>
          <div style={{flex: '1', 'overflow': 'auto'}}>
            <Menu theme="dark" mode="inline" selectedKeys={location.pathname} defaultOpenKeys={openKeys}>
              {menuRender(menuList)}
            </Menu>
          </div>
        </div>  
      </Sider>
    )
}
const mapStateToProps = ({
    collapsedReducer: {isCollapsed},
    loginReducer: {roleType}
  }) => {
  return {
    isCollapsed,
    roleType,
  }
}

export default connect(mapStateToProps)(SideMenu);