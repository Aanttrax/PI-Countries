import React, { useEffect, useState } from'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getById } from '../actions/actions';
import './DetailPage.css';

function DetailPage() {

    let { id:code } = useParams();
    let[id] = useState(code);
    const dispatch = useDispatch();
    const country = useSelector( state => state.country);
    let { flag, name, alpha3Code: countryId, region, capital, subregion, area, population, activities } = country;

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch, id]);

    return (
        <div className = 'detail'>
            <div>
                <img className = 'flag' src = {flag} alt = 'flag' />
            </div>
            <div>
                <p>Name:{name}</p>
                <p>Country Code: {countryId}</p>
                <p>Capital: {capital}</p>
                <p>Region: {region}</p>
                <p>Sub Region: {subregion}</p>
                <p>Area: {area}Km2</p>
                <p>Population: {population}</p>
            </div>
            <span>
                <h3>Activities:</h3>
                <ul>
                    {activities && activities.length ? 
                    activities.map(a => <li>{a.name}  Duration:{a.duration} Difficultad:{a.dificulty}</li>) :
                    <li>There are no activities</li>}
                </ul>
            </span>
        </div>
    )
};

export default DetailPage;