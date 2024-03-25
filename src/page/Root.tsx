import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function RootPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = "http://localhost:3000/authen";
      axios.post(url, { token:token }) // ส่งข้อมูล token ในรูปแบบของ object
        .then(response => {
          console.log(response.data);
          if (response.data.role) {
            navigate("/" + response.data.role); // ทำการ redirect เมื่อมีข้อมูล role ใน response
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      navigate("/"); // ถ้าไม่มี token ใน localStorage ให้ redirect ไปที่หน้าหลัก
    }
  }, [navigate]);
  return <Outlet />;
}

export default RootPage;