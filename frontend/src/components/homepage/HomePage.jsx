import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const HomePage = () => {
  const [singlUserDetail,setsinglUserDetail] = useState({})
 const navigate =  useNavigate()
  useEffect(()=>{
   
   const storedData = localStorage.getItem('userData');
  if (storedData) {
   setsinglUserDetail(JSON.parse(storedData))
  }
  //console.log('tokvvv',singlUserDetail.token)
   
 },[])
 const tokenCheck = ()=>{
//console.log(singlUserDetail.token)
  fetch("http://127.0.0.1:8000/api/checktoken", {
   method:'POST',
   headers: {
    'Authorization': `${singlUserDetail.token}`,
    'Content-Type': 'application/json',

  },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if(data.success==true){
        toast(data.msg,{ autoClose: 2000})
        setTimeout(()=>{
          
          //navigate('/portfolio','_blank')
          window.open('/portfolio', '_blank');
        },3000)
      }
      else {
         if(data.message==="Invalid token"){
          toast.error("Your token has expired, Please login again",{ autoClose: 3000});
          setTimeout(()=>{
            navigate('/login')
            localStorage.removeItem("userData");
          },4000)
         }
      
      }
    //  toast(data.msg)
    //  console.log(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
 }
  return (
    <>
       <h2 className='text-center'>Home Page</h2>
    <div class="card p-5" style={{width: '40rem'}}>
  <div class="card-body">
    <h3 class="card-title text-center">Welcome {singlUserDetail.name}</h3>
    <div class="card-text" style={{background:'pink',padding:'25px', marginBottom:'20px'}}></div>
   <div class='text-center'> <button onClick={tokenCheck}  class="btn btn-primary ">Check Token</button></div>
  </div>
</div>
    

    <ToastContainer />
    </>
  )
}

export default HomePage