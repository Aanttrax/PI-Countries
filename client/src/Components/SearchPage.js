import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName } from '../actions/actions';
import Cards from './Cards';

function SearchPage() {

    let countriesPage = useSelector(state => state.countriesPage);

    let act = [];

    countriesPage.map(item => item.activities.length && item.activities.map(dato => dato.name && act.push(dato.name)))

    const [filtro, setFiltro] = useState({name:'', region:'', activity:''});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getByName(filtro.name, filtro.region, filtro.activity))
    }, [dispatch, filtro]);


    let [pag, setPag] = useState(0);
    let [p, setP] = useState(0);

    let lastPage = (countriesPage.length)/10;

    let listado = []

    if(lastPage>1){

        for(let i=p;i< p+10;i++){
            if(countriesPage[i]){
                listado.push(countriesPage[i])
            }
        }

    } else {
        listado = countriesPage
    }

    function sigPage(e) {
        e.preventDefault();

        if(pag < lastPage-1) {
            setPag(pag + 1)
            setP(p + 10)
        } else {
            document.getElementById('sig').disabled = false;
        }
    };

    function antPage(e) {
        e.preventDefault();

        if(pag > 0) {
            setPag(pag - 1)
            setP(p - 10)
        } else {
            document.getElementById('ant').disabled = false;
        }
    };


    return (
        <div>
            <div>
                <input
                    placeholder = 'Find Country'
                    type = 'text'
                    name = 'username'
                    onChange = {(e) => setFiltro({...filtro, name: e.target.value})}
                    value = {filtro.name}
                />
                <select onChange = {(e) => setFiltro({...filtro, region: e.target.value})}>
                    <option value=''>Region</option>
                    <option value='Europe'>Europe</option>
                    <option value='Americas'>Americas</option>
                    <option value='Asia'>Asia</option>
                    <option value='Africa'>Africa</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='Polar'>Polar</option>
                </select>
                <select onChange = {(e) => setFiltro({...filtro, activity: e.target.value})}>
                    <option value = ''> All</option>
                    {act.map((item, i) => <option key={i} value={item}>{item}</option>)}
                </select>
                <button id ="ant" onClick={(e) => antPage(e)}>{'<'}
                </button>
                <button id ='sig' onClick={(e) => sigPage(e)}>{'>'}
                </button>
            </div>
            <Cards countries={listado}/>
        </div>
    )
};

export default SearchPage;