const GeoInfo = require('../models/geoInfo')
const axios = require("axios");

const getGeoInfo = async (req, res, next) => {
    try {
        let {
            ip
        } = req.body
        let url = `http://api.ipstack.com/${ip}&access_key=${process.env.IPSTACK_API_KEY}`
        const response = await axios.get(url);
        if (!response) {
            throw new Error()
        }

        let geoInfo = new GeoInfo(response.data)
        console.log(geoInfo.location.languages);



        req.geoInfo = response.data
        next()
    } catch (e) {
        res.status(500).send({
            error: 'Records could not be fetched from IP STACK'
        })
    }
}

module.exports = getGeoInfo