import React, { useState } from 'react'
import axios from 'axios'
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
 const navigate= useNavigate()
 const [validError,setValidError]=useState([]);
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState('');
 const [user, setUser] = useState({
   
   email:'',
   password:''
  
 });


 function valideteLoginForm(user){
   let schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
   });
  return schema.validate(user,{abortEarly:false});

 };


 function getUser(e){
        let myUser = {...user};
        myUser[e.target.name]=e.target.value;
        setUser(myUser);
      
 };

 async function submitLogin(e){
   setLoding(true);
   e.preventDefault();
   let validation=valideteLoginForm(user);

  if(validation.error){
    setLoding(false);
    setValidError(validation.error.details);

  }else{
    let {data}=await axios.post('https://route-egypt-api.herokuapp.com/signin',user);

   if(data.message === 'success'){

       localStorage.setItem('userToken',data.token);
       //navigat to login
       setLoding(false);
       props.getUserData();
       navigate('/home');

   }else{
    setLoding(false);
    let error= data.message;
    
    setError(error);
   };

  };

   
 }
  
  return (
    <div className='pt-4'>
        <h2 className='my-3'>Login Now</h2>
        {validError.map((error,index)=>{
             if(index===1){
               return <div key={index} className="alert alert-danger">password invalid</div>
             }else{
              return <div key={index} className="alert alert-danger">{error.message}</div>
             }
        })}
        {error?<div className="allert alert-danger p-2 rounded">{error}</div>:''}
        
      <form className='py-3' onSubmit={submitLogin}>
        

        <label htmlFor="email">Email</label>
        <input onChange={getUser} type="text" name='email' id='email' className='form-control my-3' />

        <label htmlFor="password">password</label>
        <input onChange={getUser} type="text" name='password' id='password' className='form-control my-3' />

        <button  className='btn btn-outline-info'>
          {loding?<i className='fas fa-spinner fa-spin '></i>:'Login'}
        </button>
      </form>
    </div>
  )
}
