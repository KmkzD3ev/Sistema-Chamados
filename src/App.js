import RoutesApp from "./routes";
import { BrowserRouter} from 'react-router-dom'
import AuthProvider from './contexts/auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <AuthProvider>
      <ToastContainer autoClose={3000}/>
       <RoutesApp/> 
       </AuthProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
