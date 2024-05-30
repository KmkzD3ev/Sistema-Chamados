import { useState  , createContext ,useEffect} from "react";
import SingIN from "../pages/SingIn";
import { auth ,db, storage } from "../services/firebaseConection";
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut} from 'firebase/auth'
import { doc,getDoc,setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext =createContext({});

function AuthProvider({children}){
    const [user ,setUser] = useState(null)
    const [loadAuth ,setloadAuth] = useState(false)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();



   useEffect(() =>{
    async function loadUser(){
        const storageUser= localStorage.getItem('@ticketsPro')

       if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoading(false)
       }


     setLoading(false)

    }


    loadUser();
   },[])





    

   async function sigInd(email, senha){
       setloadAuth(true);

    await signInWithEmailAndPassword( auth ,email,senha)
    .then( async(value) =>{
        let uid =value.user.uid;
        
         const docRef = doc(db,"users",uid);
         const docSnap = await getDoc(docRef)

         let data={
            uid:uid,
            nome: docSnap.data().nome,
            email: value.user.email,
            avatarUrl: docSnap.data().avatarUrl
        };

        setUser(data);
        storageUser(data);
        setloadAuth(false)
        toast.success("Bem vindo (a) de Volta!")
        navigate("/Dashboard")

        
    })
    .catch((error) =>{
        console.log(error)
        setloadAuth(false);
        toast.error("Ocoreu um erro ao logar")

    })



    }

   async function signUp(email , senha, nome){
    setloadAuth(true);

    await createUserWithEmailAndPassword(auth,email,senha)
    .then(async (value) =>{
    let uid = value.user.uid

await setDoc(doc(db,"users",uid),{
    nome : nome,
    avatarUrl: null,

})
.then(() =>{
    let data={
        uid:uid,
        nome:nome,
        email: value.user.email,
        avatarUrl: null
    };
    
    storageUser(data)
    setUser(data);
    setloadAuth(false)
    toast.success("Seja bem vindo")
    navigate("/Dashboard")


})
.catch((error) =>{
    console.log(error)
    setloadAuth(false)

});


    })


  }

  function storageUser(data){
    localStorage.setItem('@ticketsPro',JSON.stringify(data))

  }

async function logout(){
  await signOut(auth);
  localStorage.removeItem('@ticketsPro')
  setUser(null)

}




    return(
        <AuthContext.Provider
    value={{
        signed: !!user,
        user,
        sigInd,
        signUp,
        loadAuth,
        loading,
        logout,
        storageUser,
        setUser
    }}
    >
    {children}
</AuthContext.Provider>

    )
}

export default AuthProvider;
