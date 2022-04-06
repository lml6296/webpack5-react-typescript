import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux';
import axios from 'axios';
function Home(props) {
  const login = () => {
    props.dispatch({
      type: 'login',
      payload: {
        username: 'admin',
        password: '123456'
      }
    })
  };
  const handleTakeLatest = () => {
    props.dispatch({
      type: 'takeLatest',
    })
  };
  const handleThrottle = () => {
    props.dispatch({
      type: 'throttle',
    })
  };
  return (
    <div>
      <Button type='primary' onClick={login}>login</Button>
      <Button type='primary' onClick={handleTakeLatest}>takeLatest</Button>
      <Button type='primary' onClick={handleThrottle}>throttle</Button>
    </div>
  )
}

export default connect()(Home);
