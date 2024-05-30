import Header from "../../Components/Header"
import Title from "../../Components/Title"
import { FiUser } from "react-icons/fi"
import { useState } from "react"
import { db } from "../../services/firebaseConection"
import { addDoc ,collection } from "firebase/firestore"
import { toast } from "react-toastify"





export default function Cliente(){
const[nome ,SetNome]= useState('')
const [cnpj ,SetCnpj] = useState('')
const [endereco ,SetEndereco] = useState('')


async function handleRegister(e){
e.preventDefault();

if(nome !== '' && cnpj !== '' && endereco !== '' ){
 await addDoc(collection(db,"Clientes"),{
    nomeFantasia:nome,
    cnpj:cnpj,
    endereco:endereco
 })
.then(()=>{

 SetNome('')
 SetCnpj('')
 SetEndereco('')
 toast.success('Serviço Registrado com Sucesso ')
})
.catch((error)=>{
    console.log(error)
    toast.error("erro ao fazer cadastro")
})
}else{
    toast.error("Preencha todo os Campos!")
}
}



    return(
        <div>
           <Header/>

            <div className="content">
                <Title nome = "Clientes">
                    <FiUser size={25}/>
                </Title>
            
          <div className="conteiner">
            <form className="form-profile" onSubmit={handleRegister}>
                <label>Nome Fantasia</label>
                <input 
                type="text"
                placeholder="Nome da Empresa" 
                value={nome} onChange={(e)=>SetNome(e.target.value)}
                />

                <label>Cnpj</label>
                <input 
                type="text"
                placeholder="Cnpj" 
                value={cnpj} onChange={(e)=>SetCnpj(e.target.value)}
                />
                <label>Endereço</label>
                <input 
                type="text"
                placeholder="Endereço do Chamado" 
                value={endereco} onChange={(e)=>SetEndereco(e.target.value)}
                />
                <button type= "submit">
                    Salvar
                </button>
                

            </form>

           </div>

        </div>
        </div>
    )

}