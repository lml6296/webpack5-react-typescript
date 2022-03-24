import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Switch, Table } from 'antd';

export default function StaffList() {
  const [staffList, setStaffList] = useState([]);
  useEffect(() => {
    axios.get('/staffs').then(res => {
      setStaffList(res.data);
      console.log(staffList)
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
      <Table dataSource={staffList} columns={columns} />;
    </div>
  )
}
