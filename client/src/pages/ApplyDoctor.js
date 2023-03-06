import React from 'react'
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/altersSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
import DoctorForm from '../components/DoctorForm';
import moment from "moment"

function ApplyDoctor() {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("http://localhost:7789/api/user/apply-doctor-account",
                {
                    ...values,
                    userId: user._id,
                    timings: [
                        moment(values.timings[0]).format("HH:mm"),
                        moment(values.timings[1]).format("HH:mm"),
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
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
        <Layout>
            <h1 className="page-title">Apply Doctor</h1>

            <hr />

            <DoctorForm onFinish={onFinish} />

        </Layout>
    )
}

export default ApplyDoctor
