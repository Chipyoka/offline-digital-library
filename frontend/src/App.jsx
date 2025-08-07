import './App.css';
import { BrowserRouter as Router, Routes, Route,  Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Help from './pages/Help';
import AdminPanel from './pages/AdminPanel';


import Unauthorised from './pages/Unauthorised';
import NotFound from './pages/NotFound';

const App = () => {
  return(
    <Router>
       <Routes>
         <Route path="/" element={<Login/>}/>
         <Route path="/unauthorised" element={<Unauthorised/>}/>
         <Route path="/*" element={<NotFound/>}/>

         <Route element={<ProtectedRoute allowedRoles={['admin', 'student', 'guest']} />}>
            <Route path="/:role/dashboard" element={<Dashboard/>}/> 
            <Route path="/:role/help" element={<Help/>}/> 
        </Route>
         <Route element={<ProtectedRoute allowedRoles={['admin', 'student']} />}>
            <Route path="/:role/assessments" element={<Assessment/>}/> 
        </Route>
         <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/:role/settings" element={<AdminPanel/>}/> 
        </Route>

       </Routes>
    </Router>
  )

}

export default App;