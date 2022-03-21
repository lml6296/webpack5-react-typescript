import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Switch, Table } from 'antd';

export default function UserList() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/users').then(res => {
      setUserList(res.data);
      console.log(userList)
    });
  },[])

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '角色',
      dataIndex: 'roleId',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: () => {
        return <Switch></Switch>
      }
    },
  ];
  return (
    <div>
      <Table dataSource={userList} columns={columns} />;
    </div>
  )
}
