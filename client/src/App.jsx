import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/navbar'
import SignUp from './pages/signUp'
import SignIn from './pages/signIn'
import Home from './pages/home'
import DetailsForm from './pages/DetailsForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signUp' element={<SignUp/>}></Route>
          <Route path='/signIn' element={<SignIn/>}></Route>
          <Route path='/details' element={<DetailsForm/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
