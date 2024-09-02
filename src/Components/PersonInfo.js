import React, { useEffect, useState } from 'react';
import '../App.css';
import useCode from '../Code/Code';
import axios from 'axios';

function PersonalInfo() {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const { cstmrurl, orderUrl } = useCode();
  const [recentOrder, setRecentOrders] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://darvx.online/public/api/profile",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      const { data } = response.data;
      if (data && typeof data === 'object') {
        setUserInfo(data);
      } else {
        console.error("Unexpected response format:", data);
      }
    }).catch((error) => {
      console.error("Error fetching profile data:", error);
    });

    axios.get(orderUrl)
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.data)) {
          setRecentOrders(data.data);
        } else {
          console.error(data);
        }
      });
  }, [cstmrurl, orderUrl, token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const getImageSrc = () => {
    if (imagePreview) {
      return imagePreview;
    }
    return userInfo && userInfo.image ? `../Images/${userInfo.image}` : require("../Images/avatar.jpg");
  };

  const handleUpload = (e) => {
    e.preventDefault();

    let getData = new FormData();
    getData.append('image', image);

    axios({
      method: "POST",
      url: `https://darvx.online/public/customers/edit/${userInfo.id}`,
      data: getData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        alert('Image uploaded successfully');
        setImage(null); // Reset the image state after upload
        setImagePreview(null); // Clear the preview
      })
      .catch((error) => {
        console.error('There was an error uploading the image:', error);
        alert('Image upload failed. Please try again.');
      });
  };

  return (
    <div className="container">
      {userInfo && (
        <div className="row d-flex">
          <div className='col-2'></div>
          <div className="col-4">
            <img
              src={getImageSrc()}
              alt="profilepic"
              defaultValue={userInfo.image}
              style={{ width: '100%', height: '460px', objectFit: 'fit', padding: "10px" }}
            />
            <br /> <br />
            <input
              className='form-control'
              type='file'
              onChange={handleImageChange}
            /> <br />
            <button
              className='btn btn-success form-control'
              type='submit'
              onClick={handleUpload}
              style={{ fontWeight: "500" }}
            >
              UPLOAD
            </button>
          </div>

          <div className='personInfo col-5 p-1'>
            <br /> <br />
            <h5>User ID: <strong>{userInfo.custom_id}</strong></h5>
            <h5>Name: <strong>{userInfo.fname} {userInfo.lname}</strong> </h5>
            <h5>Contact: <strong>{userInfo.contact}</strong> </h5>
            <h5>Email: <strong>{userInfo.email}</strong></h5>
            <h5>Address: <strong>{userInfo.address} {userInfo.city}</strong> </h5>
            <h5>Province: <strong>{userInfo.province}</strong> </h5>
            <h5>Zipcode: <strong>{userInfo.zipcode}</strong> </h5>
            <div className='recentOrders'>
              <br />
              <h6 style={{ textAlign: "center", fontFamily: "sans-serif" }}>Recently Purchased</h6>
              <div className='d-flex' style={{ overflow: "hidden" }}>
                {recentOrder.slice(0, 3).map((item) => (
                  <div key={item.id} className="card m-2 carditem">
                    <img
                      style={{ width: "200%", height: "190px", objectFit: 'contain' }}
                      src={item.main_img}
                      className="btn img-fluid rounded-start p-0"
                      type='button'
                      alt="cardpic"
                    />
                    <div className="card-footer p-0 text-center">
                      <p
                        className="btn card-title p-0"
                        type='button'
                        style={{ textAlign: 'left', fontWeight: "600" }}
                      >
                        <small className='p-0' style={{ fontSize: "10px" }}>{item.prod_name.substring(0, 25)}..</small> <br />
                        &#8369;{parseFloat(item.price_per_item.replace(/,/g, '')).toLocaleString('en-US')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalInfo;
