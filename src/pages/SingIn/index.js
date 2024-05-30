import './SingIn.css'
import logo from '../../assets/logo.png'
import { useState , useContext } from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../contexts/auth'
import backgroundImage from '../../assets/new1.jpg'



export default function SingIN(){
const [email ,setEmail] = useState('')
const [senha ,setSenha] = useState('')
const { sigInd, loadAuth }= useContext(AuthContext)
const [load, setLoad] = useState(false);


 async  function handleSigInd(e){
    e.preventDefault();
    if(email !=='' && senha!== ''){
        setLoad(true);
   await sigInd(email,senha);
   setLoad(false);

    }

}

    return(
          
            
            
        <div className='conteiner-center'>
           <div className="background-image">
    <img src={backgroundImage} alt="background" />
  </div>
  <div className='black-screen'></div> {/* Div para a tela preta */}
         <div className='login'>
            <div className='login-area'>
            <img src={logo} alt='logo sistema chamados'/>
            </div>
            <form  onSubmit={handleSigInd}>
                <h1>Entrar </h1>
                 <input type='text' placeholder='Digite seu Email' value={email} 

                  onChange = { (e) => setEmail(e.target.value)}/>

                 <input type='password' placeholder='**********' value={senha}
                  onChange={(e) => setSenha(e.target.value)}/>
                  
                 
                  <button type='submit'>
                        {load ? 'Carregando...' : 'Acessar'}
                             </button>
            </form>

           <Link to="/register">Criar uma conta </Link>

         </div>
        </div>
        
    )

};