import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RealtimeCRUD from './components/RealtimeCRUD'
import Listener from './components/Listener'
import ChatStart from './components/ChatStart'
import ChatMessage from './components/ChatMessage'

function App() {

  return (
    <BrowserRouter>
      {/* <div className='App'> */}
      <Routes>
        <Route path='/' element={<RealtimeCRUD />}></Route>
        <Route path='/crud' element={<RealtimeCRUD />}></Route>
        <Route path='/listener' element={<Listener />}></Route>
        <Route path='/chat'>
          <Route index element={<ChatStart />} />
          <Route path='talk' element={<ChatMessage />} />
        </Route>
      </Routes>
      {/* </div> */}
    </BrowserRouter>
  )
}

export default App