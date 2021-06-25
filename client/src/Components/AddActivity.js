import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import './AddActivity.css';

function AddActivity() {

    let [country, setCountry] = useState('');
    let [activity, setActivity] = useState({countries:[], name: '', dificulty: "1", duration:""})
    let [season, setSeason] = useState([]);

    const countriesList = useSelector(state => state.countries);

    const handleCheck = (e) => {
        e.target.checked && setSeason([...season, e.target.value])
        !e.target.checked && setSeason([...season.filter(s => s !== e.target.value ) ])
    }

    const handleChange = (e) => {
        e.preventDefault();
        let nam = e.target.name;
        let val = e.target.value;
        setActivity({...activity,[nam]:val});
    };

    let addCountry = (e) => {
        e.preventDefault();
        console.log(validateCountry(country))
        if(validateCountry(country)) {
            setActivity({...activity, countries: [...activity.countries, country]})
            setCountry('')
            let c = document.getElementById('c')
            c.value =''
        } else {
            alert ('no Country')
        }
    };

    let delCountry = (e) => {
        e.preventDefault();
        setActivity({...activity, countries:[...activity.countries.filter(c => c !== e.target.name)]})
    };

    let handleSubmit = (e) => {
        e.preventDefault();

        let { name, dificulty, duration } = activity;

        activity.countries.map(country => 
            axios.post('http://localhost:3001/api/activity/country', { country, name, dificulty, duration })
        )

        season.map(season => 
            axios.post('http://localhost:3001/api/activity/season', { season, name, dificulty, duration })
        )

        alert('Activity Created')
    };

    let validateCountry = (a) => {
        console.log(countriesList)
        return countriesList.some(c => c.name === a)
    };

    let countryChange = (e) => {
        let cn = e.target.value
        setCountry(cn);
    }

    return (
        <div>
            <form>
                <div>
                    <h4>Add Activity</h4>
                </div>
                <label>Activity Name:</label><br/>
                <input type='text' name='name' onChange={handleChange}/>
                <div>
                    <label>Dificulty ({activity.dificulty}):</label><br/>
                    <input type='range' min='1' max='5' step='1' name='dificulty' onChange={handleChange}/><br/>
                    <label>Duration (days):</label><br/>
                    <input type= 'number' name= 'duration' onChange={handleChange}/>
                </div>
                <div>
                    <label>Country:</label><br/>
                    <input id ='c' type='text' name='country' onChange={countryChange}/>
                    <button onClick={addCountry}>+</button><br/>
                    {Array.isArray(activity.countries) && activity.countries.map((c,i) => 
                    <label key={i}> {c} 
                        <button name={c} onClick={delCountry}>X</button>
                    </label>)}
                </div>
                <label>Season:</label>
                <div>
                    <label>Winter
                        <input type='checkbox' id="Winter" value='Winter' onClick={handleCheck}/>
                        <span/>
                    </label>
                    <label>Autumn
                        <input type='checkbox' id="Autumn" value='Autumn' onClick={handleCheck}/>
                        <span/>
                    </label>
                    <label>Summer
                        <input type='checkbox' id="Summer" value='Summer' onClick={handleCheck}/>
                        <span/>
                    </label>
                    <label>Spring
                        <input type='checkbox' id="Spring" value='Spring' onClick={handleCheck}/>
                        <span/>
                    </label>
                </div>
                <button value='Add Activity' onClick={handleSubmit}>Add Activity</button>
            </form>
        </div>
    )
};

export default AddActivity;