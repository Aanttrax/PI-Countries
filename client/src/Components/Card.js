import React from "react";
import './Card.css'

function Card(props) {
    let { flag, name, region } = props;

    return (
        <div className = 'card'>
            <div>
                <img className = 'img' src = {flag} alt = 'flag'/>
            </div>
            <div>
                <h4>{name}</h4>
                <p>
                    {region}
                </p>
            </div>
        </div>
    )
};

export default Card;