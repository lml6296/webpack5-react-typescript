import React from "react";
import SideMenu from "../../components/sandbox/sideMenu";
import TopHeader from "../../components/sandbox/topHeader";
import NewsRouter from "./newsRouter";

// css
import './newsSandBox.css';
// antd
import { Layout } from 'antd';
const { Content } = Layout;

export default function NewsSandBox() {
    return (
        <Layout>
            {/* 侧边栏 */}
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                {/* 顶部 */}
                <TopHeader />
                {/* 内容 */}
                <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                    <NewsRouter></NewsRouter>
                </Content>
            </Layout>
        </Layout>
    )
}