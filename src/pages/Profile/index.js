import Header from "../../Components/Header"
import Title from "../../Components/Title"
import { FiSettings,FiUpload } from "react-icons/fi"
import avatarImg from '../../assets/avatar.png'
import { useContext ,useState } from "react"
import { AuthContext } from "../../contexts/auth"
import { doc,updateDoc } from "firebase/firestore"
import { storage,db } from "../../services/firebaseConection"
import './Profile.css'
import { toast } from "react-toastify"
import { uploadBytes,ref,getDownloadURL } from "firebase/storage"




export default function Profile(){
const {user,storageUser,setUser,logout}=useContext(AuthContext) 
const[avatarUrl,setAvatarUrl] = useState(user && user.avatarUrl)
const [nome,seTnome]= useState(user && user.nome)
const [email,seTemail]= useState(user && user.email)
const [imgA,setimgA] = useState(null)



function handleFile(e){
    if(e.target.files[0]){
      const image = e.target.files[0];

      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        setimgA(image)
        setAvatarUrl(URL.createObjectURL(image))
      }else{
        alert("Envie uma imagem do tipo PNG ou JPEG")
        setimgA(null);
        return;
      }


    }
  }


async function handleUpload(){
  const currentUid = user.uid
   const uploadRef = ref(storage, `images/${currentUid}/${imgA.name}`)
    const uploadTask = uploadBytes(uploadRef,imgA)
      
         .then((snapshot) =>{

           getDownloadURL(snapshot.ref).then( async( downloadURL) =>{
            let urlFoto= downloadURL
            const docRef =  doc(db,"users",user.uid)
            await updateDoc(docRef,{
                avatarUrl:urlFoto,
                nome:nome
            })
            .then(() =>{
                let data ={...user,
              nome:nome,
              avatarUrl:urlFoto
               }  
               setUser(data);
               storageUser(data)
               toast.success("Atualizado com sucesso")
              })


           })
         })



        } 



   async function handleSubmit(e){
    e.preventDefault();

    if (imgA === null && nome != ''){
        const docRef= doc(db,"users",user.uid)
    await updateDoc(docRef,{
        nome:nome,
        
    })
    .then(() =>{
      let data ={...user,
    nome:nome
     }  
     setUser(data);
     storageUser(data)
     toast.success("Atualizado com sucesso")
    })

    }
    else if(nome !== '' && imgA !== null){
        handleUpload();

    }
  }



    return(
        <div>
           <Header/>

           <div className="content">
            <Title nome= "Minha Conta">
              <FiSettings size={25}/>
            </Title>

           <div className="conteiner">

            <form className="form-profile" onSubmit={handleSubmit} >
             <label className='label-avatar'>
                <span>
                    <FiUpload color="#FFF" size={25}/>
                </span>
                <input type="file" accept="imge/*"  onChange={handleFile}/>  <br/>
                {avatarUrl === null? (
                    <img src={avatarImg} alt="foto do perfil" width={250} height={250}/>
                ):(
                    <img src={avatarUrl} alt="foto do perfil" width={250} height={250}/>)
                
            }


             </label> 
             

             <label>nome</label>
             <input type="text" value={nome} onChange={(e) =>seTnome(e.target.value)}/>

             <label>Email</label>
             <input type="text"value={email} disabled={true}/>

             <button type="submit">
               salvar 
             </button>



            </form>




           </div>
           <div className="container">
           <button className="logoutbtn" onClick={() =>logout()}> Sair </button>
           </div >
           
           </div>
           
        </div>
    )
}