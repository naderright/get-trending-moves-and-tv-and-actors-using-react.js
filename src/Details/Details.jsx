import React from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

export default function Details() {

    const [searchParam] = useSearchParams();
    const [details, setDetails] = useState([]);
    const currenId = searchParam.get('id');
    // setSearchParam(currenId);


   
    // jj

    useEffect(() => { 
        async function getDetails() {
            const { data } = await axios.get(`https://api.themoviedb.org/3/${currenId}?api_key=3f1c84ef0e9ef75d40bd7b4725160b8c&language=en-US`)
            setDetails(data);
            // console.log(data);
        };
        getDetails();
     });
    return (
        <>

            <div className="row">
                <div className="col-md-5 py-4">
                    <div className="image w-75" >
                        {details.poster_path ? <img className='w-100' alt='' src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} />
                            : <img className='w-100' alt='' src={`https://image.tmdb.org/t/p/w500${details.profile_path}`} />

                        }
                    </div>
                </div>
                <div className="col-md-7 py-4">
                    <div className="dataDetails">
                        {details.title ? <h2 className='text-danger '>{details.title}</h2> : <h2>{details.name}</h2>}
                        <div className="overview">
                            {details.overview ? <p className='text-muted py-2 lh-base'>{details.overview}</p> : <p className='text-muted py-2 lh-base'>{details.biography}</p>}
                            <p className='text-muted py-2 lh-base'>{details.overview}</p>
                        </div>
                        <div className="vote-watch row align-content-center align-items-center ">
                            <div className="col-lg-6 d-flex align-items-center mb-4">
                                {details.vote_average ? <p className='fs-4 h-50 my-0'>Vote :</p> : <p className='fs-4 h-50 my-0'>Popularity :</p>}
                                {details.vote_average ? <span className='px-2 bg-danger ms-2 text-center h-50'>{details.vote_average}</span> : <span className='px-2 bg-danger ms-2 text-center h-50'>{details.popularity}</span>}
                            </div>
                            <div className="col-lg-6 align-content-end">
                                <div className="btn btn-danger ms-auto mb-4"> <i className="fa-solid fa-play"></i> Watch Now</div>

                            </div>
                            {/* {details.vote_average?<p className='fs-4 h-50 my-0'>Vote :</p>:<p className='fs-4 h-50 my-0'>Popularity :</p>} */}
                            {/* {details.vote_average?<span className='px-2 bg-danger ms-2 text-center h-50'>{details.vote_average}</span>:<span className='px-2 bg-danger ms-2 text-center h-50'>{details.popularity}</span>} */}
                            {/* <div className="btn btn-danger ms-auto mt-1"> <i className="fa-solid fa-play"></i> Watch Now</div> */}
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
