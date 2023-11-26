import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const [singlUserDetail,setsinglUserDetail] = useState({})
  const navigate =  useNavigate()
   useEffect(()=>{
    
    const storedData = localStorage.getItem('userData');
   if (storedData) {
    setsinglUserDetail(JSON.parse(storedData))
   }
   //console.log('tokvvv',singlUserDetail.token)
    
  },[])
  return (
    <>
    <h2>{singlUserDetail.name} Portfolio</h2>
    <iframe src="https://fazalhadi171116.github.io/portfolio/" width="1200" height="500"></iframe>
    </>
  )
}

export default Portfolio