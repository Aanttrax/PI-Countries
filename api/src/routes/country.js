const router = require('express').Router();
const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity, Season } = require('../db');

router.get("/", async (req, res) => {
    const { page, name, sort } = req.query;
    console.log(name, page, sort);
    try {
        if(page === 'all') {
            let country = await Country.findAll({
                include: { model: Activity}
            })
            return country ? res.json(country) : res.sendStatus(404);
        };

        if (page) {
            switch (sort) {

                case 'AtoZ':
                    let country = await Country.findAll({
                        order:[['name', 'ASC']],
                        include: {model: Activity},
                        limit: 10,
                        offset: 10 * (page -1)
                    })

                    return res.json(country);

                case 'ZtoA':
                    return res.json(await Country.findAll({
                        order:[['name','DESC']],
                        include: {model:Activity},
                        limit: 10,
                        offset: 10 * (page -1)
                    }));

                case 'PobAsc':
                    return res.json(await Country.findAll({
                        order:[['population','ASC']],
                        include: {model:Activity},
                        limit: 10,
                        offset: 10 * (page -1)
                    }));

                case 'PobDes':
                    return res.json(await Country.findAll({
                        order:[['population','DESC']],
                        include: {model:Activity},
                        limit: 10,
                        offset: 10 * (page -1)
                    }));
            
                default:
                    return res.json(await Country.findAll({
                        include: {model:Activity},
                        limit: 10,
                        offset: 10 * (page -1)
                    }))
            }
        }

        if(name) {
            let country = await Country.findAll({
                include: {model: Activity},
                where : {name:{[Op.iLike]:`%${name}%`}}
            })
            return country? res.json(country) : res.sendStatus(404)
        } else {

            let season = ["Winter", "Autumn", "Spring", "Summer"]
            await Promise.all(season.map((s) => Season.findOrCreate({ where: { name: s } })))


            let apiCountries = await axios.get('https://restcountries.eu/rest/v2/all')
            await Promise.all(apiCountries.data.map((c) => {
                let info = {
                    name: c.name,
                    alpha3Code: c.alpha3Code,
                    flag: c.flag,
                    capital: c.capital? c.capital : 'no Capital',
                    region: c.region,
                    subregion: c.subregion,
                    //area: (c.area)? (c.area) : 0,
                    //population: c.population
                };
                Country.findOrCreate({where: info})
                //console.log(typeof(c.area))
            }))
            return res.status(201).json('Base de Datos Cargados')
        }
    } catch (error){
        res.status(505).send(error)
    }
});


router.get('/:idPais', async(req, res) => {
    try {
        let { idPais } = req.params;
        let country = await Country.findByPk(
            idPais.toUpperCase(),
            {include:{ model: Activity}}
        );

        country? res.json(country) : res.sendStatus(404);
    } catch (error){
        res.status(505).send(error)
    }
})

module.exports = router;