import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/altersSlice';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {

      dispatch(showLoading());
      const response = await axios.post("https://appoint-ease.onrender.com/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.data)
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  }

  return (
    <div className='authentication' >
      <div className='authentication-form card p-3'>

        <h1 className='card-title'>Welcome Back</h1>

        <Form layout='vertical' onFinish={onFinish} >

          <Form.Item label='Email' name='email'>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item label='Password' name='password'>
            <Input placeholder='Password' type='password' />
          </Form.Item>

          <div className='d-flex justify-content-between align-items-center' >
            <Button className='primary-button my-2' htmlType='submit'>Login</Button>

            <Link to='/register' className='anchor' >CLICK HERE TO REGISTER</Link>
          </div>



        </Form>

      </div>
    </div>


  )
}

export default Login