import './App.css';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './component/Home/Home.js';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store.js';
import ProductDetails from './component/Products/ProductDetails.js';
import ProductsPage from './component/Products/ProductsPage.js';
import LoginSignup from './component/User/LoginSignup.js';
import { useEffect, useState } from 'react';
import { loadUser } from './redux/users/authSlice.js';
import { useSelector } from 'react-redux';
import Account from './component/Account/Account.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import ProtectedRoute from './Route/ProtectedRoute.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';
import Checkout from './component/Cart/Checkout.js';
import axios from 'axios';
import Payment from './component/Cart/Payment.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import OrderPlaced from './component/Cart/OrderPlaced.js';
import Orders from './component/Orders/Orders.js';
import OrderDetails from './component/Orders/OrderDetails.js';


function App() {

  const { isAuthenticated, loading, userInfo } = useSelector(state => state.authentication)

  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  

  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey()
  }, [])

  console.log('stripeApiKey', stripeApiKey)
  return (
    
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<ProductsPage />} />
        <Route path='/products/:keyword' element={<ProductsPage />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path='/profile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path='/password/update' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path='/checkout/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
        <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute><Payment /></ProtectedRoute></Elements>} />
        <Route path='/success' element={<ProtectedRoute><OrderPlaced /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path='/orders/:id' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

      </Routes>    
    </Router>

  );
}

export default App;
