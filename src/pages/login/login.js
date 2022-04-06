import React, { Component, useEffect } from 'react';
import {Form, Input, Button, CheckBox} from 'antd';
import './login.css'
import { connect } from 'react-redux';
import loginActions from '../../redux/actions/loginActions';
import { useNavigate } from 'react-router-dom';
// type Props = {
//     toAuthenticateSaga: Function,
//     getOnboardingStatusSaga: Function,
//     push: Function,
//   }
function Login(props) {
    const navigate = useNavigate();
    const login = (value) => {
       props.loginSaga1(value.username, value.password);
       if (props.isLogin) {
           navigate('/home');
       } else {
           console.log('账号或密码错误')
       }
    };
        return (
            <Form onFinish={login}>
                <Form.Item 
                label="username" 
                name="username">
                    <Input></Input>
                </Form.Item>
                <Form.Item 
                label="password" 
                name="password">
                    <Input.Password />
                </Form.Item>
                <Form.Item><Button type="primary" htmlType="submit">登录</Button></Form.Item>
            </Form>
        )
}
const mapStateToProps = ({
    loginReducer: { roleType, isLogin }
  }) => {
    return {
      roleType,
      isLogin
    }
  }

const mapDispatchToProps = {
    loginSaga1: loginActions.loginSaga1,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);