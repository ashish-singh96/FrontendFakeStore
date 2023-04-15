import './App.css';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Home from './component/Home';
import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import About from './component/About';
import Contact from './component/Contact';
import Navbar from './component/Navbar';
import ShoppingCart from './component/ShoppingCart';
function App() {
  const [user, setUser] = useState('');
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    let data = localStorage.getItem('username');
    setUser(data ? data : '');
  }, [user])
  return (
    <>
      {user ? <Navbar name={user} cartItems={cartItems} setUser={setUser} /> : <></>}
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Switch>
        <Route exact path="/">
          {user ? <Home cartItems={cartItems} setCartItems={setCartItems} /> : <Login setUser={setUser} />}
        </Route>
        <Route path="/login">
          <Login setUser={setUser}  />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/about">
          {user? <About />:<Login setUser={setUser} />}
        </Route>
        <Route path="/contact">
          {user? <Contact/>:<Login setUser={setUser} />}
        </Route>
        <Route path="/cart">
          {user? <ShoppingCart setCartItems={setCartItems} cartItems={cartItems}/>:<Login setUser={setUser} />}
        </Route>
      </Switch>
      <ToastContainer/>
      </div>
    </>
  );
}

export default App;
