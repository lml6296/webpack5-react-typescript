import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from "antd";
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
    roleId: 1,
  },
  {
    key: '/user-manage',
    title: '用户管理',
    icon: <UserOutlined />,
    roleId: 2,
    children: [
      {
        key: '/user-manage/list',
        title: '用户列表',
        icon: <UserOutlined />,
        roleId: 2,
      }
    ]
  },
  {
    key: '/right-manage',
    title: '权限管理',
    icon: <UserOutlined />,
    roleId: 2,
    children: [
      {
        key: '/right-manage/list',
        title: '权限列表',
        icon: <UserOutlined />,
        roleId: 2,
      }
    ]
  }
]
// 图标数据
const iconList = {
  '/home': <UserOutlined />,
  '/user-manage': <UserOutlined />,
  '/right-manage': <UserOutlined />,
  '/news-manage': <UserOutlined />
}
export default function SideMenu () {
    // const [collapsed, setcollapsed] = useState(false);
    // const [menuList, setMenuList] = useState([]);
    // useEffect(() => {
    //   axios.get('http://localhost:8000/rights?_embed=children').then(res => {
    //     setMenuList(res.data);
    //   })
    // },[]);
    // const [role, setRole] = useEffect();
    const role = 2;
    const checkPagePermission = (item) => {
      // return item.pagepermission === 1;
      return item.roleId === role;
    }
    // v6用useNavigate代替useHistory
    const navigate = useNavigate();
    const menuRender = (menuList) => {
      return menuList.map((item) => {
        if (item.children?.length>0 && checkPagePermission(item)) {
          return (
            <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
              {menuRender(item.children)}
            </SubMenu>
          )
        }
        return checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick= {() => navigate(item.key)}>{item.title}</Menu.Item>
      })
    };
      // 
    const location = useLocation();
    const openKeys = ['/' + location.pathname.split('/')[1]];
    return (
      <Sider trigger={null} collapsible collapsed={false}>
        <div style={{display: 'flex', height: '100%', 'flexDirection': 'column'}}>
          <div className="logo">新闻管理平台</div>
          <div style={{flex: '1', 'overflow': 'auto'}}>
            <Menu theme="dark" mode="inline" selectedKeys={location.pathname} defaultOpenKeys={openKeys}>
              {menuRender(menuList)}
            </Menu>
          </div>
        </div>  
      </Sider>
    )
}