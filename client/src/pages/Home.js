import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/altersSlice";
import Doctor from '../components/Doctor';

function Home() {

  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get("https://appoint-ease.onrender.com/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  };

  useEffect(() => {
    getData();
  }, []);
  

  return (
    <Layout>
      <Row gutter={20} >
        {doctors.map((doctor)=> (
          <Col span={8} xs={24} sm={24} lg={8} >
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default Home