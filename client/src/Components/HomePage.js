import React, { useEffect, useState } from "react";
import { getPage, getByName } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Cards from './Cards';
import './HomePage.css'


function HomePage() {
    
    let { page: pa, sort: srt } = useParams();
    let [page, setPage] = useState(parseInt(pa));
    let [sort, setSort] = useState(`${srt}`);
    const [filtro, setFiltro] = useState({name:'', region:'', activity:''});

    const dispatch = useDispatch();

    let countriesPage = useSelector(state => state.countriesPage);

    let act = [];

    countriesPage.map(item => item.activities.length && item.activities.map(dato => dato.name && act.push(dato.name)))

    let lastPage = 25;

    useEffect(() => {
        dispatch(getPage(page,sort))
    }, [dispatch, page, sort])

    useEffect(() => {
        dispatch(getByName(filtro.name, filtro.region, filtro.activity))
    }, [dispatch, filtro]);


    let [pag, setPag] = useState(0);
    let [p, setP] = useState(0);

    let lastPag = (countriesPage.length)/10;

    let listado = []

    if(lastPag>1){

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

        if(pag < lastPag-1) {
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



    function nextPage(e) {
        e.preventDefault();

        if(page < lastPage) {
            //document.getElementById('prev').disabled = false;
            setPage(page + 1)
        } else {
            document.getElementById('next').disabled = false;
        }
    };

    function prevPage(e) {
        e.preventDefault();

        if(page > 1) {
            //document.getElementById('next').disabled = false;
            setPage(page - 1)
        } else {
            document.getElementById('prev').disabled = false;
        }
    };

    function changeSort(e) {
        setSort(e.target.value)
        setPage(1)
        if(e.target.value === ''){
            setFiltro({...filtro, region: '' })
        }
        let x = document.getElementById("bott");
        let y = document.getElementById("bott1");
        if (e.target.value === '') {
            x.style.display = "block";
            y.style.display = 'none'
        } else {
            x.style.display = "none";
            y.style.display = 'block'
        };
        console.log(e.target.value)
    };

    function changeRegion(e) {
        setFiltro({...filtro, region: e.target.value})
        setP(0)
        setPag(0)
        let x = document.getElementById("bott");
        let y = document.getElementById("bott1");
        if (e.target.value === '') {
            x.style.display = "none";
            y.style.display = 'block'
        } else {
            x.style.display = "block";
            y.style.display = 'none'
        };

    }

    function changeActivity(e) {
        setFiltro({...filtro, activity: e.target.value})
    }
    

    return (
        <div>
            <div>
                {/* <Link to ='/search'>Buscar</Link> */}
                <input
                    placeholder = 'Find Country'
                    type = 'text'
                    name = 'username'
                    onChange = {(e) => setFiltro({...filtro, name: e.target.value})}
                    value = {filtro.name}
                />
                <select onChange = {(e) => changeRegion(e) }>
                    <option value=''>Region</option>
                    <option value='Europe'>Europe</option>
                    <option value='Americas'>Americas</option>
                    <option value='Asia'>Asia</option>
                    <option value='Africa'>Africa</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='Polar'>Polar</option>
                </select>
                <select onChange = {(e) => changeActivity(e)}>
                    <option value = ''> All</option>
                    {act.map((item, i) => <option key={i} value={item}>{item}</option>)}
                </select>

                <select onChange={(e) => changeSort(e)}>
                    <option value=''>Order By</option>
                    <option value='AtoZ'>A to Z</option>
                    <option value='ZtoA'>Z to A</option>
                    <option value='PobAsc'>Ascending Population</option>
                    <option value='PobDes'>Descending Population</option>
                </select>
                <div id = 'bott1'>
                    <button id ="prev" onClick={(e) => prevPage(e)}>
                        <Link to = { '/home/' + (page - 1)}>{'<'}</Link>
                    </button>
                    <button id ='next' onClick={(e) => nextPage(e)}>
                        <Link to = { '/home/' + (page + 1)}>{'>'}</Link>
                    </button>
                </div>
                <div id = 'bott'>
                    <button id ="ant" onClick={(e) => antPage(e)}>{'<'}
                    </button>
                    <button id ='sig' onClick={(e) => sigPage(e)}>{'>'}
                    </button>
                </div>
            </div>
            <Cards 
                page={ page }
                sort={ sort }
                countries={ listado }
                nextPage={ nextPage }
                prevPage={ prevPage }
                changeSort={ changeSort }
            />
        </div>
    )
};

export default HomePage;