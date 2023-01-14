import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateChat from './pages/PrivateChat';
import Edit from './pages/Edit';
import SearchResults from './pages/SearchResults';
import Requests from './pages/Requests';
import { DataProvider } from './api/GlobalState';



function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#A875F0",
      },
    },
  });

  const user = localStorage.getItem("user_id")

  return (
    
      <DataProvider>
      <ThemeProvider theme={theme} >
      <Router>
      <Routes>
        <Route exact path='/' element= { user ? <PrivateChat/> : <Home/>} />
        <Route path="/login" element={ user ? <PrivateChat/> :  <Login/> }/>
        <Route path="register" element = {  user ? <PrivateChat/> : <Register/> }/>
        <Route path="/profile/:id" element={ <Profile/> }/>
        <Route path="/profile" element={ <Profile/> }/>
        <Route path="/messages" element={ user ? <PrivateChat/> : <Login/> }/>
        <Route path="/edit" element={ user ? <Edit/> : <Login/> }/>
        <Route path="/search" element={<SearchResults/>}/>
        <Route path="/request" element={ user ? <Requests/> : <Login/> } />
      </Routes>
    </Router>
    </ThemeProvider>
    </DataProvider>
    
  );
}

export default App;
