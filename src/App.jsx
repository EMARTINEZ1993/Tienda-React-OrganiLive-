import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

import Header from './components/Header';
import GoogleSheetIntegration from './components/GoogleSheetIntegration';
import Formulario from './components/ContactForm'
import Footer from './components/Footer';
import Carrito from './components/Cart'

import AboutUs from './Pages/AboutUs';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import EditProfile from './Pages/EditProfile';

import ChangePassword from './Pages/ChangePassword';


// Componente Home para la página principal
const Home = () => {
  return (
    <>
      <main className="products-section">
        <GoogleSheetIntegration />
      </main>
      <div className='contact-form-container'>
        <Formulario/>
      </div>
    </>
  );
};


function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="app">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/nosotros" element={<AboutUs />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Dashboard />} />
            <Route path="/perfil/editar" element={<EditProfile />} />
            <Route path="/perfil/cambiar-password" element={<ChangePassword />} />
          </Routes>
          
            <Carrito/>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;