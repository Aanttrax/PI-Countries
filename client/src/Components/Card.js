import React from "react";

function Card(props) {
    let { flag, name, region } = props;

    return (
        <div>
            <div>
                <img src = {flag} alt = 'flag'/>
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