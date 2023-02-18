import React, {useEffect} from 'react'
import axios from 'axios'

function Home() {

  const getData = async()=>{
    try {
      const response = await axios.post('http://localhost:7789/api/user/get-user-info-by-id', {} , {
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        },
      })
      console.log(response.data)
    } catch (error) {
      console.log(error ) 
    }
  }

  useEffect(() => {
    getData();
  }, [])
  

  return (
    <div>Home</div>
  )
}

export default Home