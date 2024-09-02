import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Info = () => {
    const [userInfo, setUserInfo] = useState(null);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        axios({
          method: "GET",
          url: "http://127.0.0.1:8000/api/profile",
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then((response) => {
          const { data } = response.data;
    
          // Check if data is an object and contains the expected properties
          if (data && typeof data === 'object') {
            setUserInfo(data); // Set the data object
          } else {
            console.error("Unexpected response format:", data);
          }
        }).catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }, [token]);

    return (
        <div>
            {userInfo ? (
                <div>
                  <p>User ID: {userInfo.custom_id} </p>
                    <p>Name: {userInfo.fname} {userInfo.lname} </p>
                    <p>Contact: {userInfo.contact} </p>
                    <p>Email: {userInfo.email}</p>
                    <p>Address: {userInfo.address} {userInfo.city} </p>
                    <p> Province: {userInfo.province} </p>
                    <p>Zipcode: {userInfo.zipcode} </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Info;
