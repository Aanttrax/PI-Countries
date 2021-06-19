import React, { useEffect, useState } from "react";
import { getPage } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Cards from './Cards';


function HomePage() {
    
    let { page: pag, sort: srt } = useParams();
    let [page, setPage] = useState(parseInt(pag));
    let [sort, setSort] = useState(`${srt}`);

    const dispatch = useDispatch();

    let countriesPage = useSelector(state => state.countriesPage);

    let lastPage = 25;

    useEffect(() => {
        dispatch(getPage(page,sort))
    }, [dispatch, page, sort])

    function nextPage(e) {
        e.preventDefault();

        if(page < lastPage) {
            document.getElementById('prev').disabled = false;
            setPage(page + 1)
        } else {
            document.getElementById('next').disabled = true;
        }
    };

    function prevPage(e) {
        e.preventDefault();

        if(page > 1) {
            document.getElementById('next').disabled = false;
            setPage(page - 1)
        } else {
            document.getElementById('prev').disabled = true;
        }
    };

    function changeSort(e) {
        setSort(e.target.value)
    };

    return (
        <div>
            <div>
                <Link to ='/search'>Buscar</Link>
                <button id ="prev" onClick={(e) => prevPage(e)}>
                    <Link to = { '/home/' + (page - 1)}>{'<'}</Link>
                </button>
                <button id ='next' onClick={(e) => nextPage(e)}>
                    <Link to = { '/home/' + (page + 1)}>{'>'}</Link>
                </button>
                <select onChange={(e) => changeSort(e)}>
                    <option value=''>Order By</option>
                    <option value='AtoZ'>A to Z</option>
                    <option value='ZtoA'>Z to A</option>
                    <option value='pobAsc'>Ascending Population</option>
                    <option value='pobDes'>Descending Population</option>
                </select>
            </div>
            <Cards 
                page={ page }
                sort={ sort }
                countries={ countriesPage }
                nextPage={ nextPage }
                prevPage={ prevPage }
                changeSort={ changeSort }
            />
        </div>
    )
};

export default HomePage;