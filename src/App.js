import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import List from './pages/Lists/List';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/lists' element={<List />} />
        </Routes>
      </>
    </Router >

  );
}

export default App;
