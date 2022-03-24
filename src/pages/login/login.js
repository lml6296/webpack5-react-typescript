import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Form, Input, Button, CheckBox} from 'antd';
import './login.css'
import { connect } from 'react-redux';



function Login(props) {
    const navigate = useNavigate();
    const saveRoleType = (roleType) => {
        props.saveRoleType(roleType);
    };
    const login = (value) => {
        axios.get(`/staffs?username=${value.username}&password=${value.password}`).then(res => {
            if(res.data.length > 0) {
                console.log(res.data[0])
                localStorage.setItem('token', JSON.stringify(res.data[0]));
                saveRoleType(res.data[0].roleType);
                navigate('/home');
            } else {
                console.log('登录失败');
            }
        }

        )
    };
    return (
        <Form 
            onFinish={login}>
                <Form.Item label="username" name="username">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="password" name="password">
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">登录</Button>
                </Form.Item>
        </Form>
    )
}

const mapDispatchToProps = {
    saveRoleType(roleType) {
        return { 
            type: 'save_roleType',
            payload: roleType
        }
    }
}
export default connect(null, mapDispatchToProps)(Login);