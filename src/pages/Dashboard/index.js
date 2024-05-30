import { AuthContext } from "../../contexts/auth"
import { useContext,useEffect,useState } from "react"
import Header from "../../Components/Header";
import './Dashboard.css'
import Title from "../../Components/Title";
import { FiPlus,FiMessageSquare ,FiSearch,FiEdit2} from "react-icons/fi";
import { Link} from "react-router-dom";
import { collection,getDocs,orderBy,limit,startAfter,query } from "firebase/firestore";
import { db } from "../../services/firebaseConection";
import { format } from "date-fns";
import Modal from "../../Components/Modal";



const listRef = collection( db , "chamados")

export default function Dashboard(){

const {logout}=useContext(AuthContext)
const [chamados,setChamados] = useState([])
const [load,setLoad] = useState(true)
const [listEmpty,setListEmpty]= useState(false)
const [lastDocs,setLastDocs]=useState()
const [buscarItens,setBuscarItens]=useState(false)
const [showModal,setShowModal] = useState(false)
const [detail,setDetail]=useState()



useEffect (() =>{
    async function loadChamados(){
      const q =query(listRef,orderBy('created','desc'),limit(5))

      const querySnapshot = await getDocs(q)
      setChamados([])
      await updateState(querySnapshot)
      setLoad(false)

    }

    loadChamados();
return () =>{ }

},[])



async function updateState(querySnapshot){
    const isCollectionEmpty = querySnapshot.size ===0;

    if(!isCollectionEmpty){
        let lista = [];
  
        querySnapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            assunto: doc.data().assunto,
            cliente: doc.data().cliente,
            clienteId: doc.data().clienteId,
            created: doc.data().created,
            createdformat:format(doc.data().created.toDate(), 'dd/MM/yyyy'),
            status: doc.data().status,
            complemento: doc.data().complemento,
          })
        })
         const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1 ]
         

        setChamados(chamados => [...chamados, ...lista])
         setLastDocs(lastDoc)

  
      }else{
        setListEmpty(true);
      }
      setBuscarItens(false)
      

}


    async function handleMore(){
        setBuscarItens(true)
        const q =query(listRef,orderBy('created','desc'), startAfter(lastDocs), limit(5))
        const querySnapshot = await getDocs(q)
        await updateState(querySnapshot)

        
     }

     function toggleModal(item){
      setShowModal(!showModal)
      setDetail(item)


     }




   if(load){
    return(
        <div>
          <Header/> 
          <div className="content">
          <Title nome="Chamados">
                <FiMessageSquare size={25}/>
            </Title>
            <div className="container dashboard">
                <span>Buscando Chamados...</span>

            </div>


            </div> 
        </div>
    )

         }


    return(
        <div>
            <Header/>
          <div className="content">
            <Title nome="Chamados">
                <FiMessageSquare size={25}/>
            </Title>
          <>
         
          {chamados.length === 0 ?(
            <div className="conteiner dashboard">
                <span>
                    Nenhum Chamado encontrado....
                </span>
                <Link to="/New" className="new">

                <FiPlus color="#FFF" size={25}/> 

                 Abrir Solicitação
                    </Link>

            </div>
          ):(
            <>
            
            <Link to="/New" className="new">

                 <FiPlus color="#FFF" size={25}/>

                      Abrir Solicitação
                         </Link>
                         <table>
            <thead>
                <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Assunto</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cadastrado em</th>
                    <th scope="col">#</th>
                </tr>
            </thead>
            <tbody>
                {chamados.map((item,index)=>{
                    return(
                        <tr key={index}>
                    <td data-label="Cliente">{item.cliente}</td>
                    <td data-label="Assunto"> {item.assunto}</td>
                    <td data-label="Status">
                          <span className="badge" style={{ backgroundColor: item.status === 'aberto' ? '#5cb85c' : '#999' }}>
                            {item.status}
                          </span>
                        </td>
                    <td data-label="Cadastrado "> {item.createdformat}</td>
                    <td data-label="#"> 
                    <button className="action" style={{backgroundColor:'#3583f6'}} onClick={ ( )=> toggleModal(item)}>
                        <FiSearch color="#fff" size={17}/>
                    </button>
                    <Link to={`/New/${item.id}`} className="action"  style={{backgroundColor:'#f6a935'}}>
                        <FiEdit2 color="#fff" size={17}/>
                    </Link>
                    
                    </td>
                </tr>
                    )
                })}

            </tbody>

          </table>
          {buscarItens && <h3>Buscando mais Itens...</h3>}
         {!buscarItens && !listEmpty && <button className="btn-more" onClick={handleMore}> buscar mais itens</button>} 
         
            
            
            </>
          )
          }
          
          </>
          
          </div>
           {showModal && (
              <Modal
              conteudo={detail}
              close = {() => setShowModal(!showModal)}
              />
           )}

        </div>
    )

}