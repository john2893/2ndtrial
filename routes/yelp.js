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
    .then(response => {
        console.log(JSON.stringify(response.data.businesses))
        const dataLen = JSON.stringify(response.data.businesses.length)
        let name
        let image
        let rating
        let address
        const food = []
        const foodObj = {}

        for (i=0; i<=(dataLen-1); i++){ 
            //console.log(response.data.businesses[i].rating)
            //console.log(response.data.businesses[i].location.address1 +","+ response.data.businesses[i].location.state)
            //console.log(response.data.businesses[i].image_url)
            name = response.data.businesses[i].name
            image = response.data.businesses[i].image_url
            rating = response.data.businesses[i].rating
            address = [response.data.businesses[i].location.address1 +","+ response.data.businesses[i].location.state]
            foodObj[i] = {
                name: name,
                image: image,
                rating: rating,
                address: address
            }
            food.push(foodObj[i])

        }
        console.log (food)

        res.render('index', {
            //name, image, rating, address
            food
        })
    })
    .catch ((err) => {
        console.log(err)
    })
})

module.exports = router;