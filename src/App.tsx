import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Index from './components/Index'
import Details from './components/Details'
import Header from './components/Header'
import Create from './components/Create'
import Tags from './components/Tags'


const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index" element={<Index />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
        <Route path="/tags" element={<Tags />} />
      </Routes>
    </BrowserRouter>
  );

}

export default AppRoutes;
