import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MediaContext } from '../MediaContext';

export default function Tv() {
const {tv} = useContext(MediaContext);

 
  let navigate = useNavigate()
  function getId(id, mediaType) {
    navigate({
      pathname: '/details',
      search: `?id=${mediaType}/${id}`

    });


  };
  return (
    <>
    {tv?<div className="row py-4">
        <div className="col-md-4 py-3">
          <div className="brdr w-25 my-3"></div>
          <h2 className='h3'>Trending <br /> Tv <br /> To Watch Now</h2>
          <p className='text-muted'>Most wached movies by days</p>
          <div className="brdr my-3"></div>
        </div>
        {tv.map((tv, index) =>
          <div onClick={() => getId(tv.id, 'tv')} key={index} className="col-md-2">
            <div className="tv">
              <div className="image position-relative w-100 ">
                <img className='w-100 my-1' src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt={tv.title} />
                <span className='bg-info position-absolute rate'>{tv.vote_average}</span>
              </div> 
               <h3 className='h6 mt-3'>{tv.name}</h3>
            </div>
          </div>
        )}
      </div>:""
    }
      

    </>
  )
}
