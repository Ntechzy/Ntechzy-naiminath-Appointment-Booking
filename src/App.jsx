import React from 'react'
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CompleteCaseForm from './components/caseForm/CompleteCaseForm';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<BookingPage/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
      </Routes>
 <CompleteCaseForm/>
    </Router>
    </>
  )
}

export default App