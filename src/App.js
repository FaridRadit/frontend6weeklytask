import './App.css'; //
import 'bootstrap/dist/css/bootstrap.min.css'; //
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //

// Impor halaman dan komponen baru
import Noteuser from './pages/DataNote.js'; //
import AddNote from './pages/addNote.js'; //
import EditNote from './pages/editNote.js'; //
import Login from './pages/Login.js'; // Impor Login
import Register from './pages/Register.js'; // Impor Register

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute publik */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        {/* Rute yang dilindungi (akan dicek di dalam komponen) */}
        <Route path="/" element={<Noteuser />}></Route>
        <Route path='/addNote' element={<AddNote />}></Route>
        <Route path='/editNote/:id' element={<EditNote />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; //