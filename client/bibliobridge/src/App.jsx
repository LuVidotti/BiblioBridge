import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Painel from './pages/Painel';
import Page404 from './pages/Page404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/painel' element={<Painel />}/>
        <Route path='*' element={<Page404 />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
