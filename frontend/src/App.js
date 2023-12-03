import './App.css';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './component/Home/Home.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import ProductDetails from './component/Products/ProductDetails.js';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />

      </Routes>
      
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
