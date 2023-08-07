import logo from './logo.svg';
import './App.css';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Authorized } from './views/Authorized';
import { NavBar } from './nav/NavBar';
import { Route, Routes } from 'react-router-dom';
import { AppViews } from './views/AppViews';
import { ThemeProvider, createTheme } from '@mui/material';

const themed = createTheme({
  palette: {
    primary: {
      main: '#9617b7',
      contrastText: '#0c0c0c',
    },
    secondary: {
      main: '#8e3454',
    },
    text: {
      primary: '#735f79',
    },
    background: {
      paper: '#1a1a1a',
      default: '#141414',
    },
    error: {
      main: '#960810',
    },
  },
})

const App = () => {
  return <ThemeProvider theme={themed}>
  <Routes>
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
 </ThemeProvider>
}

export default App