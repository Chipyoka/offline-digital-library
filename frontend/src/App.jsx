import './App.css';
import { BrowserRouter as Router, Routes, Route,  Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  return(
    <Router>
       <Routes>
         <Route path="/" element={<Login/>}/>

         <Route element={<ProtectedRoute allowedRoles={['admin', 'student', 'guest']} />}>
            <Route path="/:role/dashboard" element={<Dashboard/>}/> 
        </Route>

       </Routes>
    </Router>
  )

}

export default App;