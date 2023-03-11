import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/altersSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading());
            const resposne = await axios.get("http://localhost:7789/api/doctor/get-appointments-by-doctor-id", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (resposne.data.success) {
                setAppointments(resposne.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const changeAppointmentStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const resposne = await axios.post(
                "http://localhost:7789/api/doctor/change-appointment-status",
                { appointmentId : record._id, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (resposne.data.success) {
                toast.success(resposne.data.message);
                getAppointmentsData();
            }
        } catch (error) {
            toast.error('Error changing doctor account status');
            dispatch(hideLoading());
        }
    };

    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
        },
        {
            title: "Patient",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.userInfo.name}
                </span>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (text, record) => (
                <span>
                    {record.userInfo.email}
                </span>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Time",
            dataIndex: "time",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === 'pending' &&
                        <div className="d-flex" >
                            <h1
                                className="anchor px-2"
                                onClick={() => changeAppointmentStatus(record, 'approved')}
                            >
                                Approve
                            </h1>

                            <h1
                                className="anchor"
                                onClick={() => changeAppointmentStatus(record, 'rejected')}
                            >
                                Reject
                            </h1>

                        </div>
                    }

                </div>
            ),
        },
    ];
    useEffect(() => {
        getAppointmentsData();
    }, []);
    return <Layout>
        <h1 className="page-title">Appointments</h1>
        <hr />
        <Table columns={columns} dataSource={appointments} />
    </Layout>
}

export default DoctorAppointments;