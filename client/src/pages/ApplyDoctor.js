import React from 'react'
import Layout from '../components/Layout';
import { Form, Row, Col, Input, TimePicker, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/altersSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'

function ApplyDoctor() {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("http://localhost:7789/api/user/apply-doctor-account",
                { ...values, userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/home');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <h1 className="page-title">Apply Doctor</h1>

            <hr />

            <Form layout='vertical' onFinish={onFinish}>

                <h1 className="card-title mt-3">Personal Information</h1>

                <Row gutter={20} >
                    <Col span={8} xs={24} sm={24} lg={8} >
                        <Form.Item required label="First Name" name="firstName" rules={[{ required: true }]} >
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8} >
                        <Form.Item required label="Last Name" name="lastName" rules={[{ required: true }]} >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8} >
                        <Form.Item required label="Phone Number" name="phoneNumber" rules={[{ required: true }]} >
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8} >
                        <Form.Item required label="Website" name="website" rules={[{ required: true }]} >
                            <Input placeholder="Website" />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8} >
                        <Form.Item required label="Address" name="address" rules={[{ required: true }]} >
                            <Input placeholder="Address" />
                        </Form.Item>
                    </Col>

                </Row>

                <hr />

                <h1 className="card-title mt-3">Professional Information</h1>

                <Row gutter={20} >
                    <Col span={8} xs={24} sm={24} lg={8} >
                        <Form.Item required label="Specialization" name="specialization" rules={[{ required: true }]} >
                            <Input placeholder="Specialization" />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8} >
                        <Form.Item required label="Experience" name="experience" rules={[{ required: true }]} >
                            <Input placeholder="Experience" />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8} >
                        <Form.Item required label="Fee Per Consultant" name="feePerConsultant" rules={[{ required: true }]} >
                            <Input placeholder="Fee Per Consultant" />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8} >
                        <Form.Item required label="Timings" name="timings" rules={[{ required: true }]} >
                            <TimePicker.RangePicker />
                        </Form.Item>
                    </Col>

                </Row>

                <div className="d-flex justify-content-end">
                    <Button className='primary-button' htmlType='submit' >SUBMIT</Button>
                </div>

            </Form>

        </Layout>
    )
}

export default ApplyDoctor