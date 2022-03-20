import React, { useState } from "react";
import { Layout, Dropdown, Menu, Avatar } from "antd";
import { connect } from "react-redux";
const { Header } = Layout;
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';

function TopHeader (props) {
  // console.log(props);
    // const [collapsed, setcollapsed] = useState(false);
    const changeCollapsed = () => {
    //     setcollapsed(!collapsed);
      // 改变state中的isCollapsed
      // console.log(props)
      props.changeCollapsed()
    };
    const menu = (
        <Menu>
          <Menu.Item>
            aaa
          </Menu.Item>
          <Menu.Item>
            bbb
          </Menu.Item>
          <Menu.Item disabled>
            ccc
          </Menu.Item>
          <Menu.Item danger>a danger item</Menu.Item>
        </Menu>
      );
    return (
        <Header className="site-layout-background" style={{ padding: '0 16px'}}>
            {
                props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> : <MenuFoldOutlined onClick={changeCollapsed}/>
            }
            <div style={{float: 'right'}}>
                <span>欢迎回来</span>
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}

const mapStateToProps = ({collapsedReducer: {isCollapsed}}) => {
  return {
    isCollapsed
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