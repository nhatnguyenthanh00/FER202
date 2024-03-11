import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/common/Login/Login';
import Home from './components/Client/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
