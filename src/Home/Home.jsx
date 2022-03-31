import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom';


export default function Home() {
   
    const [movie, setMovie] = useState([]);
    const [tv, setTv] = useState([]);
    const [pepole, setPepole] = useState([]);

    

  async function getTrending(typeMedia,callback){
    let{data} =await axios.get(`https://api.themoviedb.org/3/trending/${typeMedia}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
    callback(data.results.slice(0,10));
  }

  useEffect(()=>{

    getTrending('movie',setMovie);
    getTrending('tv',setTv);
    getTrending('person',setPepole);
  },[]);


 let navigate=useNavigate()
  function getId(id,mediaType){
       navigate({
         pathname:'/details',
         search:`?id=${mediaType}/${id}`
         
       });
       
      
  }  ;

  return (
    <>
    <div className="row py-4">
         <div className="col-md-4 py-3">
           <div className="brdr w-25 my-3"></div>
           <h2 className='h3'>Trending <br /> Movies <br /> To Watch Now</h2>
           <p className='text-muted'>Most wached movies by days</p>

           <div className="brdr my-3"></div>
         </div>
         {movie.map((movie,index)=>
           <div onClick={()=>getId(movie.id,'movie')} key={index} className="col-md-2">
             <div className="movie">
               <img className='w-100 my-1' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
               <h3 className='h6 mt-3'>{movie.title}</h3>
             </div>
           </div>
         )}
    </div>

    <div className="row py-4">
         <div className="col-md-4 py-3">
           <div className="brdr w-25 my-3"></div>
           <h2 className='h3'>Trending <br /> Tv <br /> To Watch Now</h2>
           <p className='text-muted'>Most wached movies by days</p>
           <div className="brdr my-3"></div>
         </div>
         {tv.map((tv,index)=>
           <div onClick={()=>getId(tv.id,'tv')} key={index} className="col-md-2">
             <div className="tv">
               <img className='w-100 my-1' src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt={tv.title} />
               <h3 className='h6 mt-3'>{tv.name}</h3>
             </div>
           </div>
         )}
    </div>
    
    <div className="row py-4">
         <div className="col-md-4 py-3">
           <div className="brdr w-25 my-3"></div>
           <h2 className='h3'>Trending <br /> Person <br /> To Watch Now</h2>
           <p className='text-muted'>Most wached movies by days</p>

           <div className="brdr my-3"></div>
         </div>
         {pepole.map((pepole,index)=>
           <div onClick={()=>getId(pepole.id,'person')} key={index} className="col-md-2">
             <div className="pepole">
               <img className='w-100 my-1' src={`https://image.tmdb.org/t/p/w500${pepole.profile_path}`} alt={pepole.title} />
               <h3 className='h6 mt-3'>{pepole.name}</h3>
             </div>
           </div>
         )}
    </div>
    </>
  )
}
