const router = require('express').Router();

const axios = require('axios');
require('dotenv').config();

router.get('/', (req,res) => {
    res.render('index')
})

router.post('/', (req,res) => {
    //res.render('index')
    console.log(req.body.city)
    const city = req.body.city
    const uri_api = 'https://api.yelp.com/v3/businesses/search'
    
    axios.get(uri_api, {
        
        headers: {
            Authorization: `Bearer ${process.env.apiKey}`
       },
       params: {
           location: city
       }
    })
    .then((res) => {
        console.log(JSON.stringify(res.data.businesses.length))
        const dataLen = JSON.stringify(res.data.businesses.length)
        const test = "testing tihs"
        for (i=0; i<=(dataLen-1); i++){ 
            console.log(res.data.businesses[i].rating)
            console.log(res.data.businesses[i].location.address1 +","+ res.data.businesses[i].location.state)
            console.log(res.data.businesses[i].image_url)
        }
        res.render('index', {
            dataLen:test,
            error: false
        })
    })
    .catch ((err) => {
        console.log(err)
    })
})

module.exports = router;