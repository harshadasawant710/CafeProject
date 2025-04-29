import React, { useEffect, useState } from 'react'
import Registration from './components/Registration'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LogIn from './components/LogIn'
import { contextapi } from './Contextapi'
import Navbar from './components/Navbar'
import AdminDashboard from './components/AdminDashboard'
import FoodProducts from './components/FoodProducts'
import AdminInsertform from './components/AdminInsertform'
import Admineditform from './components/Admineditform'
import Footer from './components/Footer'
import CartPage from './components/CartPage'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import BookTable from './components/BookTable'
import MyBookings from './components/MyBookings'

const App = () => {
  const getCart = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart);
    }
    return {};
  };

  const getTotalItems = (cart) => {
    if (!cart || !cart.items) return 0;
    return Object.values(cart.items).reduce((sum, qty) => sum + qty, 0);
  };

  const [loginname, setLoginname] = useState(localStorage.getItem('loginname'));
  const [cart, setCart] = useState(getCart());
  const [totalitems, setTotalItems] = useState(getTotalItems(cart));


  useEffect(() => {
    if (cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
      setTotalItems(getTotalItems(cart));
    }
  }, [cart]);

  return (
    <div>
      <Router>
        <contextapi.Provider value={{ loginname, setLoginname, cart, setCart, totalitems, setTotalItems }}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Reg' element={<Registration />}></Route>
            <Route path='/LogIn' element={<LogIn />}></Route>
            <Route path='/Dashboard' element={<AdminDashboard />}></Route>
            <Route path='/foodProducts' element={<FoodProducts />}></Route>
            <Route path='/AdminInsertForm' element={<AdminInsertform />}></Route>
            <Route path='/adminproductupdate/:id' element={<Admineditform />}></Route>
            <Route path='/addtocartpage' element={<CartPage />}></Route>
            <Route path='/aboutUs' element={<AboutUs />}></Route>
            <Route path='/bookTable' element={<BookTable />}></Route>
            <Route path='/mybookings' element={<MyBookings />}></Route>
          </Routes>
        </contextapi.Provider>
        <a href='/' style={{textDecoration:'none'}} className='homeButton'>Add Review</a>
        <Footer />
      </Router>
      {/* <Registration/> */}
    </div>
  )
}

export default App
