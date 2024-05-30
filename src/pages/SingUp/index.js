import logo from '../../assets/logo.png'
import { useContext, useState , } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../services/firebaseConection'
import {AuthContext} from '../../contexts/auth'
import backgroundImage from '../../assets/new1.jpg'



export default function SiginUp(){
    const [nome,setNome] = useState ('')
    const [email ,setEmail] = useState('')
    const [senha ,setSenha] = useState('')
    const {signUp,setloadAuth} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);




    async function handleSubmit(e){
        e.preventDefault();
    
        if(nome !== '' && email !== '' && senha !== ''){
            setLoading(true);
            await signUp(email, senha, nome);
            setLoading(false);
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
                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar Cliente </h1>
                     <input type='text' placeholder='Nome' value={nome} 
    
                      onChange = { (e) => setNome(e.target.value)}/>
    
                     <input type='text' placeholder='Email' value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                      
                     
                      <input type='password' placeholder='*********' value={senha}
                      onChange={(e) => setSenha(e.target.value)}/>


                <button type='submit'>
                        {loading ? 'Carregando...' : 'Cadastrar'}
                             </button>

                </form>
    
               <Link to="/">Ja possui Login? Acesse sua conta! </Link>
    
             </div>
            </div>
        )
    
    };