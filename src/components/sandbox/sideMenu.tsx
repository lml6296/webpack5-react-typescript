import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.css';
// ts
type Props = {
  roleType: string,
  isCollapsed: boolean,
}
interface MenuList {
  key: string,
  title: string,
  icon: JSX.Element,
  roleType: Array<string>,
  children?:Array<MenuList>
}
// ant-design
import { Layout, Menu } from "antd";
const { Sider } = Layout;
const { SubMenu } = Menu;
import {
    UserOutlined,
    HomeOutlined,
    OrderedListOutlined,
    UnorderedListOutlined,
    SolutionOutlined,
    AlignCenterOutlined,
    BookOutlined,
  } from '@ant-design/icons';

// 菜单数据
const menuList:Array<MenuList> = [
  {
    key: '/home',
    title: '首页',
    icon: <HomeOutlined />,
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
        icon: <OrderedListOutlined />,
        roleType: ['admin'],
      },
      {
        key: '/user-manage/user-list',
        title: '用户列表',
        icon: <UnorderedListOutlined />,
        roleType: ['admin'],
      }
    ]
  },
  {
    key: '/right-manage',
    title: '权限管理',
    icon: <SolutionOutlined />,
    roleType: ['admin'],
    children: [
      {
        key: '/right-manage/right-list',
        title: '权限列表',
        icon: <AlignCenterOutlined />,
        roleType: ['admin'],
      },
    ]
  },
  {
    key: '/blog-manage',
    title: '博客管理',
    icon: <BookOutlined />,
    roleType: ['checker'],
    children: [
      {
        key: '/blog-manage/blog-list',
        title: '博客列表',
        icon: <UnorderedListOutlined />,
        roleType: ['checker'],
      },
    ]
  },
]
function SideMenu (props: Props) {
    const checkPagePermission = (item) => {
      return item.roleType.indexOf(props.roleType) !== -1;
    }
    // v6用useNavigate代替useHistory
    const navigate = useNavigate();
    const menuRender = (menuList) => {
      return menuList.map((item) => {
        if (item.children?.length>0 && checkPagePermission(item)) {
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {menuRender(item.children)}
            </SubMenu>
          )
        }
        return checkPagePermission(item) && <Menu.Item key={item.key} icon={item.icon} onClick= {() => navigate(item.key)}>{item.title}</Menu.Item>
      })
    };
    const location = useLocation();
    const openKeys = ['/' + location.pathname.split('/')[1]];
    return (
      <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
        <div style={{display: 'flex', height: '100%', 'flexDirection': 'column'}}>
          <div className="logo">博客管理平台</div>
          <div style={{flex: '1', 'overflow': 'auto'}}>
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} defaultOpenKeys={openKeys}>
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