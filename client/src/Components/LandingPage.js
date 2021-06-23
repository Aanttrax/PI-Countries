import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAll, getStart } from '../actions/actions';
import world from '../img/mapa.jpg';
import './LandingPage.css'


function LandingPage() {
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getStart())
        dispatch(getAll())
    },[dispatch])

    return (
        <div>
            <Link to='/home/1'>
                <img src={world}  alt='world' width="100%" height="110%"/>
            </Link>
        </div>
    )
};

export default LandingPage;