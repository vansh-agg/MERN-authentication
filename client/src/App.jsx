import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard/dashboard';
import Header from './components/header/header';
import Error from './components/error/error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';


import Home from './components/home/home';
function App() {

  return (
    <>

      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="*" element={<Error />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>

    </>
  );
}

export default App;
