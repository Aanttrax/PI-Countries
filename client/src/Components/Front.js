import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards'

function Front(){

    //       let info = {
    //           name: c.name,
    //           alpha3Code: c.alpha3Code,
    //           flag: c.flag,
    //           capital: c.capital? c.capital : 'no Capital',
    //           region: c.region,
    //           subregion: c.subregion,
    //           area: (c.area)? (c.area) : 0,
    //           population: c.population
    //       };
    //   }))


    const [url, setUrl] = useState('https://restcountries.eu/rest/v2/all');
    const [respuestaAPI, setRespuestaAPI] = useState({ respuesta: 'OK' });

    useEffect(() => {
        const consultaAPI = async () => {
          const consulta = await axios({ url });
          setRespuestaAPI(consulta);
         };
    consultaAPI();
    }, []);


    let asc = (e) => {
        e.preventDefault();
        respuestaAPI.data.sort((a,b)=>a.area - b.area);
    }

    let desc = (e) => {
        e.preventDefault();
        //todos.data.sort((a,b)=>b.area - a.area);
    }

return(
    <div>
        <div>
            <button onClick = {asc} >Ascending</button>
            <button onClick = {desc}>Descending</button>
        </div>
        <Cards />

    </div>
)
}

export default Front;