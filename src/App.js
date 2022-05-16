import Home from './components/home';
import './styles/main.scss';
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to='/1'/>} />
        <Route path=':id' element={<Home />} />
      </Routes>
    </div>
  );
}