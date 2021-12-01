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
        const realData = (response.data.businesses)
        const dataLen = JSON.stringify(response.data.businesses.length)
        let name
        let image
        let rating
        let address
        const foodArr = []
        const foodObj = {}

        for (i=0; i<=(dataLen-1); i++){ 
            //console.log(response.data.businesses[i].rating)
            //console.log(response.data.businesses[i].location.address1 +","+ response.data.businesses[i].location.state)
            //console.log(response.data.businesses[i].image_url)
            name = realData[i].name
            image = realData[i].image_url
            rating = realData[i].rating
            address = [realData[i].location.address1 +","+ realData[i].location.state]
            foodObj[i] = {
                name: name,
                image: image,
                rating: rating,
                address: address
            }
            foodArr.push(foodObj[i])

        }
        console.log (foodArr)

        res.render('index', {food:foodArr})
    })
    .catch ((err) => {
        console.log(err.response.status)
    })
})

module.exports = router;