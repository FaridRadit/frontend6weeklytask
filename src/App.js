
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Noteuser from './pages/DataNote.js';
import AddNote from './pages/addNote.js';
import EditNote from './pages/editNote.js';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Noteuser/>}></Route>
      <Route path='/addNote' element={<AddNote/>}></Route>
      <Route path='/editNote/:id' element={<EditNote/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
