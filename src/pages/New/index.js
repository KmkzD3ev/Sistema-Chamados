import './New.css'
import Header from '../../Components/Header'
import Title from '../../Components/Title'
import { FiPlusCircle } from 'react-icons/fi'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { db} from '../../services/firebaseConection'
import { collection,getDoc,getDocs,doc,updateDoc,addDoc} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useParams,useNavigate } from 'react-router-dom'
import { update } from 'firebase/database'




export default function New(){
const listRef = collection(db,"Clientes")
const [ClienteSelect,setClienteSelect] = useState(0)
const {user} = useContext(AuthContext)
const {id}=useParams();
const [idCliente ,setIdCliente] = useState(false)

const [Clientes,setClientes] = useState([])
const [Complemento,setComplemento] = useState('')
const [Asssunto,setAssunto] = useState('Suporte')
const [Status,setStatus] = useState('aberto')
const [loadClientes,setLoadClientes]= useState(true)
const navigate= useNavigate();



useEffect(()=>{
  
    async function loadClientes(){
        const querySnapshot =await getDocs(listRef)
        .then((snapshot) =>{
            console.log(snapshot.docs)
            let lista = []
            snapshot.forEach((doc) =>{
             lista.push({
                id:doc.id,
                nomeFantasia:doc.data().nomeFantasia
             })
            })
          if(snapshot.length === 0){
         
            console.log("Nada Encontrado")
            setClientes([{id:'1',nomeFantasia:'FREELA'}])
            setLoadClientes(false)
            return;
          }

         setClientes(lista);
         setLoadClientes(false)
         
         if(id){
         loadId(lista);
         }

        })
        .catch((error) =>{
            console.log(error)
            setLoadClientes(false)
            setClientes([{id:'1',nomeFantasia:'FREELA'}])

        })

    }
    loadClientes();
},[id])


async function loadId(lista){
  const docRef = doc( db, "chamados" ,id );
  await getDoc(docRef)
  .then((snapshot)=>{
    setAssunto(snapshot.data().assunto)
    setStatus(snapshot.data().status)
    setComplemento(snapshot.data().complemento);

     let index= lista.findIndex(item => item.id ===snapshot.data().clienteId)
     setClienteSelect(index);
     setIdCliente(true)

  })
  .catch((error)=>{
    console.log(error)
    setIdCliente(false)

  })

}






function handleOptionChange(e){
    setStatus(e.target.value)
}


function handleChangeSelect(e){
    setAssunto(e.target.value)

}

  function  handleChrangeSelect(e){
  setClienteSelect(e.target.value)
  }

  async function handleRegister(e){
    e.preventDefault();

   if(idCliente){
    const docRef =doc(db, "chamados" ,id ,)
    await updateDoc(docRef,{

      cliente: Clientes[ClienteSelect].nomeFantasia,
      clienteId: Clientes[ClienteSelect].id,
      assunto:Asssunto, 
      complemento: Complemento,
      status: Status,
      userId: user.uid,
    })
    .then(() =>{
      toast.info("Chamado Atualizado com Sucesso!")
      setClienteSelect(0);
      setComplemento('');
      navigate ('/Dashboard')
      
    })
    .catch((error)=>{
      toast.error("Erro ao Atualizar Chamado ")
         console.log(error)
    })
    return;
  }
   


    //Registrar um chamado
    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      cliente: Clientes[ClienteSelect].nomeFantasia,
      clienteId: Clientes[ClienteSelect].id,
      assunto:Asssunto, 
      complemento: Complemento,
      status: Status,
      userId: user.uid,
    })
    .then(() => {
      toast.success("Chamado registrado!")
      setComplemento('')
      setClienteSelect(0)
    })
    .catch((error) => {
      toast.error("Ops erro ao registrar, tente mais tarde!")
      console.log(error);
    })
  }



    return(
        <div>
         <Header/>
         <div className="content">
            <Title nome={id ? "Editando Chamado" : "Novo Chamado"}>
                <FiPlusCircle size={25}/>
                </Title>

                <div className='conteiner'>
                    <form className='form-profile' onSubmit={handleRegister}>
                       <label>Clientes</label>
                       {
                        loadClientes ? (
                            <input type='text' disabled={true} value="Carregando..."/>

                        ) :(
                            <select value={ClienteSelect} onChange={handleChrangeSelect}>
                             {
                                Clientes.map((item,index)=>{
                                   return(
                                    <option key={index} value={index}>
                                       {item.nomeFantasia} 

                                    </option>
                                   )
                                })
                                
                             }
                            </select>

                        )
                    }

                        <label>Asuntos</label>
                       <select value={Asssunto} onChange={handleChangeSelect} >
                        <option value="suporte"> Suporte </option>
                        <option value="Visita Tecnica"> Visita Tecnica</option>
                        <option value="Financeiro"> Financeiro</option>
                       
                       </select>

                       <label>Status</label>
                       <div className='status'>
                          <input
                          type="radio"
                          name="radio"
                          value="aberto"
                          onChange={handleOptionChange}
                          checked={Status ==='aberto'}
                          />
                          <span>Em aberto</span>

                          <input
                          type="radio"
                          name="radio"
                          value="Progresso"
                          onChange={handleOptionChange}
                          checked={Status ==='Progresso'}
                          />
                          <span>Progresso</span>

                          <input
                          type="radio"
                          name="radio"
                          value="Concluido"
                          onChange={handleOptionChange}
                          checked={Status ==='Concluido'}
                          
                          />
                          <span>Concluído</span>
                       </div>

                       <label>Complemento</label>
                       <textarea
                        type="text"
                        placeholder="Descreva Seu Problema(Opcional)"
                        value={Complemento} onChange={(e) =>setComplemento(e.target.value)}
                       
                       
                       />
                       <button type="submit">Registrar</button>
                    </form>
                </div>


         </div>
           
        </div>
    )
}