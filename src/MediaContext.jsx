import {createContext} from 'react';
import  { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'



export const MediaContext = createContext([]);

export const MediaContextProvider = (props)=>{
    const [movie, setMovie] = useState([]);
    const [tv, setTv] = useState([]);
    const [pepole, setPepole] = useState([]);
  
    async function getTrending(typeMedia, callback) {
      let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${typeMedia}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
      callback(data.results.slice(0, 10));
    }
  
    useEffect(() => {
  
      getTrending('movie', setMovie);
      getTrending('tv', setTv);
      getTrending('person', setPepole);
    }, []);
  
    return <MediaContext.Provider value={{movie,tv,pepole}}>
        {props.children}
    </MediaContext.Provider>
}