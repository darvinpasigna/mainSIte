import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import MemberHome from './Pages/Member/MemberHome';
import MemberAbout from './Pages/Member/MemberAbout';
import MemberContact from './Pages/Member/MemberContact';
import PersonalProfile from './Pages/Member/PersonalProfile';
import Cart from './Pages/Member/Cart';
import Shop from './Pages/Member/Shop';
import Purchases from './Pages/Member/Purchases';
import ProtectedPages from './Components/ProtectedPages';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Routes>
      <Route path="/PPGgameshopP5" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/memberhome" element={<ProtectedPages element={MemberHome} />} />
      <Route path="/memberabout" element={<ProtectedPages element={MemberAbout} />} />
      <Route path="/membercontact" element={<ProtectedPages element={MemberContact} />} />
      <Route path="/personalprofile" element={<ProtectedPages element={PersonalProfile} />} />
      <Route path="/cart" element={<ProtectedPages element={Cart} />} />
      <Route path="/shop" element={<ProtectedPages element={Shop} />} />
      <Route path="/purchases" element={<ProtectedPages element={Purchases} />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
