import React, { useState } from "react";
import { Layout, Dropdown, Menu, Avatar } from "antd";
import { connect } from "react-redux";
const { Header } = Layout;
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

// enum RoleType {
//   ADMIN = 'admin',
//   CHECKER = 'checker',
// }
// const roleTypeMap = {
//   [RoleType.ADMIN]: '管理员',
//   [RoleType.CHECKER]: '审核员',
// }
const roleTypeMap = {
  'admin': '管理员',
  'checker': '审核员',
}
type Props = {
  isCollapsed: boolean,
  roleType: string,
  changeCollapsed: Function,
}
function TopHeader (props: Props) {
  const changeCollapsed = () => { props.changeCollapsed() };
  const navigate = useNavigate();
  const menu = (
    <Menu>
      <Menu.Item>{roleTypeMap[props.roleType]}</Menu.Item>
      <Menu.Item danger onClick={() => {
        localStorage.removeItem('token');
        navigate('/login');
      }}>退出</Menu.Item>
    </Menu>
  );
    return (
        <Header className="site-layout-background" style={{ padding: '0 16px'}}>
            {
                props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> : <MenuFoldOutlined onClick={changeCollapsed}/>
            }
            <div style={{float: 'right'}}>
                <span>欢迎{roleTypeMap[props.roleType]}</span>
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}

const mapStateToProps = ({
  collapsedReducer: {isCollapsed},
  loginReducer: { roleType }
}) => {
  return {
    isCollapsed,
    roleType
  }
}
const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: 'change_collapsed_action',
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);