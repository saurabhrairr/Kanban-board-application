import React from 'react';
import BoardList from './BoardList-Component/BoardList';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import CreateBoard from './BoardListPost-Component/CreateBoard';
import Deletecoulum from './Deletecolum-componet/Deletecoulum';
import Item from './ItemComponent/Item';
function App() {
  return (
  <>
  <BrowserRouter>

  <Routes>

    <Route path='/' element={<CreateBoard/>} ></Route>
    <Route path='/BoardList' element={<BoardList/>} ></Route>
    <Route path='/Deletecoulum' element={<Deletecoulum/>} ></Route>
    <Route path='/Item' element={<Item/>} ></Route>
  </Routes>
  
  </BrowserRouter>
  
  
  </>

  );
}

export default App;
