import React from "react";
import { Link } from "react-router-dom";
import Card from './Card';

function Cards(props) {
    let { countries } = props;

    return (
        <div>
            {Array.isArray(countries) && countries.map((c,i) => (
                <Link to = {`/country/${c.alpha3Code}`} key = {`link_${c.alpha3Code}`}>
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