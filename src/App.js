import logo from './logo.svg';
import './App.css';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Authorized } from './views/Authorized';
import { NavBar } from './nav/NavBar';
import { Route, Routes } from 'react-router-dom';
import { AppViews } from './views/AppViews';

const App = () => {
  return <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={
        <Authorized>
          <>
            <NavBar />
            <AppViews/>
          </>
        </Authorized>
      } />
  </Routes>
}

export default App