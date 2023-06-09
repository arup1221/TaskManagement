import React, { useEffect, useState } from 'react';
import {signOut,onAuthStateChanged} from "firebase/auth";
import {auth,db} from '../firebase.jsx'
import { useNavigate } from 'react-router-dom';
import {uid} from "uid";
import {set,ref, onValue, remove, update} from "firebase/database";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';

const Home = () => {
    const [todo, setTodo] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [todos, setTodos] = useState([]);
    const [tempUidd, setTempUidd] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // read
          onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
            setTodos([]);
            const data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((todo) => {
                setTodos((oldArray) => [...oldArray, todo]);
              });
            }
          });
        } else if (!user) {
          navigate("/");
        }
      });
    }, []);

    const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            alert(err.message);
          });
      };
    
      // add
      const writeToDatabase = () => {
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
          todo: todo,
          uidd: uidd
        });
    
        setTodo(" ");
   
      };
    
   
    // update
  const handleUpdate = (todo) => {
   
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
    
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

    console.log(auth.currentUser)


  return (
       
    <div className='h-screen w-screen bg-gradient-to-tr from-pink-500 to-indigo-900 relative flex flex-col justify-center items-center'>
     
      <div className=''>
        <input type="text" placeholder='Add Tasks...' className=' border-slate-800 border-2 absolute top-10 outline-none h-10 w-2/4 text-lg p-5 justify-center items-center left-16 md:left-80 rounded-lg' value={todo} onChange={(e)=> setTodo(e.target.value)}/>
        </div>
        {
  todos.map((todo, index) => (
    <div className='flex  items-center space-x-2 space flex-initial p-2' key={index}>
      <div className='relative start-0 w-60 md:w-96 h-full p-2 bg-slate-200 border-slate-800 border-2 rounded-lg '>
      <h1>{todo.todo}</h1>
      </div>
      <button className='text-yellow-400 hover:text-yellow-600' onClick={() => handleUpdate(todo)}><EditIcon/></button>
      <button className='text-red-600 hover:text-red-400' onClick={() => handleDelete(todo.uidd)}><DeleteIcon/></button>
      {/* here facing re rerending problem so don't call function directly to solve it warp it to a anonymous arrow function */}
    </div>
  ))
}

        { isEdit ? (
            <div>
                <button className='absolute scale-150 top-12 right-1/4 text-green-400 hover:text-green-600 flex' onClick={handleEditConfirm}><CheckIcon/></button>
            </div>
        ) : (
            <div>
                <button className='absolute scale-150 top-12 right-1/4 text-green-400 hover:text-green-600' onClick={writeToDatabase}><AddBoxIcon/></button>
            </div>
        )}
        

        <button onClick={handleSignOut} className='bg-red-500 hover:bg-red-700 absolute scale-150 top-4 h-8 w-8 right-4'><LogoutIcon/></button>
    </div>
  )
}

export default Home
