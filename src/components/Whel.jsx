import React,{useState, useEffect} from 'react'
import {signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from '../firebase.jsx';
import {useNavigate} from "react-router-dom"

const Whel = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegestering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const [registerInformation, setRegisterInformation] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{ if(user){
            navigate("/homepage")
        }
    });
        
    },[]);






    const handleEmailchange = (e)=>{
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value);
    };
    const handleSignIn = (e) =>{
        signInWithEmailAndPassword(auth, email, password).then(()=>{
            navigate("/homepage")
        }).catch((err) => alert(err.message));
    }
    const handleRegister = () => {
        if (registerInformation.email !== registerInformation.confirmEmail){
            alert("Please confirm that email are the same");
            return;
        } else if (registerInformation.password !== registerInformation.confirmPassword) {
            alert("please confirm that the password are same");
            return;
        }
        createUserWithEmailAndPassword(auth,registerInformation.email,registerInformation.password).then(()=>
        {
            navigate("/homepage")
        }).catch((err) => alert(err.message));
    };
  return (
    <div className='h-screen w-screen bg-gradient-to-tr from-pink-500 to-indigo-900 relative '>
      <div className='pt-10 pl-4 md:pl-8 font-abc text-4xl md:text-7xl text-white font-bold  '>
        
        <div className='absolute bottom-0  md:top-0 right-0 md:right-20 scale-10 md:scale-70 '> <img src="src/assets/todo-svg.svg" alt="image" /></div>
       
       <h1 >Task - Management App</h1> 
      </div>
      <div className='absolute flex items-center justify-center flex-col p-4 md:p-6 left-4 md:left-16 top-28 md:top-1/4 bg-white rounded-lg w-4/6 md:w-1/6'>
       {
        isRegestering ?(

        <div className='flex flex-col space-y-3'>
        
        <input type = "email" placeholder='Email'className='border-slate-800 border-2 rounded-lg pl-2' value={registerInformation.email}   onChange={(e)=> setRegisterInformation({...registerInformation, email:e.target.value})} />

        <input type="email" placeholder='Confirm Email'
        className='border-slate-800 border-2 rounded-lg pl-2'value={registerInformation.confirmEmail} onChange={(e)=> setRegisterInformation({...registerInformation, confirmEmail:e.target.value})}/>

        <input type="password" placeholder='Password'
        className='border-slate-800 border-2 rounded-lg pl-2' value={registerInformation.password}   onChange={(e)=> setRegisterInformation({...registerInformation, password:e.target.value})}/>

        <input type="password" placeholder='Confirm Password'
        className='border-slate-800 border-2 rounded-lg pl-2' value={registerInformation.confirmPassword} onChange={(e)=> setRegisterInformation({...registerInformation, confirmPassword:e.target.value})}/>

        <button onClick={handleRegister}className='bg-sky-300 hover:bg-sky-500 rounded-full cursor-pointer font-mono font-bold'>Register</button>

        <button className='font-bold text-sky-500 hover:text-green-500'  onClick={()=> setIsRegistering(false)}>Go Back</button>
        </div> ):(
        
        <div className='flex flex-col space-y-3'>
             <input type = "email" placeholder='Email' onChange={handleEmailchange} value={email} className='border-slate-800 border-2 rounded-lg pl-2'/>
        <input  type = "password" placeholder='Password' onChange={handlePasswordChange} value={password} className='border-slate-800 border-2 rounded-lg pl-2'/>

        <button onClick={handleSignIn}className='bg-sky-300 hover:bg-sky-500 rounded-full p-1 font-mono font-bold'>Sign in</button>

        <button className='text-sky-500 hover:text-indigo-600' onClick={()=> setIsRegistering(true)}>Create an Account</button>
        </div>)
       }
      </div>
    </div>
  )
}

export default Whel
