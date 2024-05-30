import './Header.css';
import avatarImg from '../../assets/avatar.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { FiHome,FiUser, FiSettings } from 'react-icons/fi'


export default function Header(){
const { user } = useContext(AuthContext)


    return(
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatarImg :user.avatarUrl } alt="Foto do Usuario"/>
            </div>

        <Link to ='/Dashboard'>
        <FiHome color="#fff" size={24}/>
        Chamados
        </Link>

        <Link to ='/Clientes'>
        <FiUser color="#fff" size={24}/>
        Clientes
        </Link>

        <Link to ='/Profile'>
        <FiSettings color="#fff" size={24}/>
        Perfil
        </Link>





        </div>
    )
}

