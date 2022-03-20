import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Form, Input, Button, CheckBox} from 'antd';
import './login.css'



export default function Login() {
    const navigate = useNavigate();
    const login = (value) => {
        axios.get(`http://localhost:8000/users?username=${value.username}&password=${value.password}`).then(res => {
            if(res.data.length > 0) {
                console.log(res.data)
                localStorage.setItem('token', JSON.stringify(res.data[0]));
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
            {/* <form className='form-box'> */}
                {/* <div className='tit'>login</div>
                <input type='text' placeholder='账号'/> */}
                <Form.Item label="username" name="username">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="password" name="password">
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">登录</Button>
                </Form.Item>
                {/* <input type=' password' placeholder='密码'/> */}
                {/* <input type='submit'>登录</input> */}
            {/* </form> */}
        </Form>
    )
}