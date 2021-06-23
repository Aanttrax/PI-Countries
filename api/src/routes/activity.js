const router = require('express').Router();
const { Op } = require('sequelize');
const { Country, Activity, Season } = require('../db');

router.post('/country', async (req, res) => {
    
    let { name, dificulty, duration, country } = req.body;
    console.log(req.body)
    try {
        let addActivity = await Activity.findOrCreate({
            where: {
                name,
                dificulty,
                duration
            }
        });

        let anexCountry = await Country.findOne({
            include: { model: Activity },
            where: { 
                name: {
                     [Op.iLike]: `${country}` } }
        });

        console.log(anexCountry, addActivity)
        await addActivity[0].setCountries(anexCountry);
        res.json(addActivity)

    }catch (error){
        res.status(505).send(error)
    }
})

router.post('/season', async (req,res) => {

    let { name, dificulty, duration, season } = req.body;

    try {
        let addActivity = await Activity.findOrCreate({
            where: {
                name,
                dificulty,
                duration
            }
        });

        let addSeason = await Season.findByPk(season);

        await addActivity[0].setSeasons(addSeason);
        res.json(addActivity) 

    } catch (error) {
        res.status(505).send(error)
    }
})

module.exports = router;