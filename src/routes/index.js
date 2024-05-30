import { Routes , Route } from 'react-router-dom'

import SingIN from '../pages/SingIn'
import SingUp from '../pages/SingUp'
import Dashboard from '../pages/Dashboard'
import Private from './Private'
import Profile from '../pages/Profile'
import Cliente from '../pages/Cliente'
import New from '../pages/New'



function RoutesApp(){
    return(
        <Routes>
         <Route  path='/' element={ <SingIN/> } />
         <Route  path='/register' element={ <SingUp/> } />
         <Route  path='/Dashboard' element={<Private> <Dashboard/> </Private> }   />                            
          <Route path='/Profile'  element ={<Private><Profile/></Private> }  /> 
          <Route path='/Clientes'  element={<Private><Cliente/></Private>}/>
          <Route path='/New' element={<Private><New/></Private>} /> 
          <Route path='/New/:id' element={<Private><New/></Private>} />                                                                                    
        </Routes>
    )

}

export default RoutesApp;