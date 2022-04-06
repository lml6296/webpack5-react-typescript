import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Switch, Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import userActions from '../../../redux/actions/userActions';

function UserList(props) {
  const [userList, setUserList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useEffect(() => {
    // props.xxxsaga其实就是一个action
    props.fetchUserListSaga();
    setUserList(props.userList);
  },[])
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: '电话',
      dataIndex: 'mobilePhone',
    },
    {
      title: '地址',
      dataIndex: 'region',
      filters: [
        {
          text: '北京',
          value: '北京',
        },
        {
          text: '深圳',
          value: '深圳',
        },
      ],
      onFilter: (value, record) => record.region.indexOf(value) === 0,
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      filters: [
        {
          text: '启用',
          value: true,
        },
        {
          text: '禁用',
          value: false,
        },
      ],
      onFilter: (value, record) => record.roleState === value,
      render: (status, item) => {
        return <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        checked={item.roleState}
        onChange={() => changeStatus(item)}/>
      }
    },
  ];
  const rowSelection = {
    // selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRows)
    },
  };
  const hasSelected = selectedRowKeys.length > 0;
  // 启用、禁用
  const changeStatus = (item) => {
    props.changeStatusSaga(item);
    item.roleState = !item.roleState;
    // setUserList([...userList]);
    // axios.patch(`/users/${item.id}`, {
    //   roleState: item.roleState
    // })
  };
  return (
    <div>
      <div>
        <span>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        dataSource={userList} 
        columns={columns}
        bordered={true}
        size='small'/>
    </div>
  )
}
// mapStateToProps是一个函数，建立一个从外部state对象到UI组件的props对象的映射
// mapStateToProps会订阅Store，每当State更新的时候，就会自动执行，重新计算UI的参数，从而触发UI组件重新渲染
const mapStateToProps = ({
  userReducer: {userList},
}) => {
  return {
    userList
  }
}

const mapDispatchToProps = {
  fetchUserListSaga: userActions.fetchUserListSaga,
  changeStatusSaga: userActions.changeStatusSaga,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
