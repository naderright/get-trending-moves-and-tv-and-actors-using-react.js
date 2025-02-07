import React, { useState } from 'react'
import axios from 'axios'
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register() {
 let navigate= useNavigate();
 const [validError,setValidError]=useState([]);
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState('');
 const [user, setUser] = useState({
  name: '',
  email: '',
  password: '',
  rePassword: '',
  phone: '',
  
 }); 
 const [lastErrore,setLastErrore]=useState('');
 const [invalidPassword,setInvalidPassword]=useState('');

 function valideteRegisterForm(user){
   let schema = Joi.object({
    name:Joi.string().alphanum().min(3).max(8).required(),
    phone:Joi.number(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    rePassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
   });
  return schema.validate(user,{abortEarly:false});

 };


 function getUser(e){
        let myUser = {...user};
        myUser[e.target.name]=e.target.value;
        setUser(myUser);
      
 };

 async function submitRegister(e){
   setLoding(true);
   e.preventDefault();
   let validation=valideteRegisterForm(user);

  if(validation.error){
    setLoding(false);
    setValidError(validation.error.details);
    console.log(validation.error.details)
    setLastErrore(validation.error.details[validation.error.details.length-1].messemail)
    const numColum=validation.error.details[validation.error.details.length-1].message.lastIndexOf(':')
    // console.log(validation.error.details[validation.error.details.length-1].message.slice(0,62))
   console.log(numColum)
   setInvalidPassword(validation.error.details[validation.error.details.length-1].message.slice(0,numColum))
   
   console.log(invalidPassword)
   // const nader = validation.error.details;
    
    //   console.log(nader.message.indexof('password'))
  
    

  }else{
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',user);

    console.log(data);
    

   if(data.message === 'success login'){
       //navigat to login
       setLoding(false);
       navigate('/login');
       console.log('nader')

   }else{
    setLoding(false);
    let error= data.message;
    
    setError(error);
   };

  };

   
 }
  
  return (
    <div className='pt-4'>
        <h2 className='my-3'>Register Now</h2>
        {validError? validError.map((error,index)=>{
             if(lastErrore.includes("password")){
               validError[validError.length-1].message=invalidPassword;
               return <div key={index} className="alert alert-danger">{error.message}</div>
             }else{
              return <div key={index} className="alert alert-danger">{error.message}</div>
             }
        }):''}
        {error?<div className="allert alert-danger p-2 rounded">{error}</div>:''}
        
      <form className='py-3' onSubmit={submitRegister}>
        
        <label htmlFor="name">Name</label>
        <input onChange={getUser} type="text" name='name' id='name' className='form-control my-3' />

        <label htmlFor="phone">Phone</label>
        <input onChange={getUser} type="number" name='phone' id='phone' className='form-control my-3' />

        <label htmlFor="email">Email</label>
        <input onChange={getUser} type="email" name='email' id='email' className='form-control my-3' />

        <label htmlFor="password">Password</label>
        <input onChange={getUser} type="password" name='password' id='password' className='form-control my-3' />

        <label htmlFor="rePassword">rePassword</label>
        <input onChange={getUser} type="password" name='rePassword' id='rePassword' className='form-control my-3' />

        <button  className='btn btn-outline-info'>
          {loding?<i className='fas fa-spinner fa-spin '></i>:'Register'}
        </button>
      </form>
    </div>
  )
}
