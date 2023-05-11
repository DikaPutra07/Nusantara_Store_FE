import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import Product from './components/Details/Product';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserProfile from './components/profile/UserProfile';
import Shop from './components/profile/Shop';
import CreateProduct from './components/profile/CreateProduct';
import EditShop from './components/profile/EditShop';
import Transaction from './components/profile/Transaction';

function App() {

  const auth = useSelector(state => state.auth);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar/>
        <Routes>
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          {auth.id && <Route path='/profile/user' element={<UserProfile />} />}
          {auth.id && <Route path='/profile/shop' element={<Shop />} />}
          {auth.id && <Route path='/profile/create-product' element={<CreateProduct />} />}
          {auth.id && <Route path='/profile/order' element={<Transaction />} />}
          <Route path='/products/edit/:id' element={<EditShop />} />
          <Route path='/products/:_id' element={<Product />} />
          <Route path='/products/category/:category_id' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;