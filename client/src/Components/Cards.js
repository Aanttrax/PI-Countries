import React from "react";
import { Link } from "react-router-dom";
import Card from './Card';
import './Cards.css';

function Cards(props) {
    let { countries } = props;

    return (
        <div className = 'container'>
            {Array.isArray(countries) && countries.map((c,i) => (
                <Link className = 'linkcard' to = {`/country/${c.alpha3Code}`} key = {`link_${c.alpha3Code}`}>
                    <Card
                        name = { c.name }
                        flag = { c.flag }
                        region = { c.region }
                        key = { c.alpha3Code }
                    />
                </Link>
            ))}
        </div>
    )
};

export default Cards;