const express = require('express')
const GeoInfo = require('../models/geoInfo')
const auth = require('../middleware/auth')
const geo = require('../middleware/getGeoInfo')
const router = new express.Router()

router.post('/geoinfos', auth, geo, async (req, res) => {
    console.log(req.geoInfo);

    const geoInfo = new GeoInfo({
        ...req.geoInfo,
        user: req.user._id
    })
    console.log(geoInfo);

    try {
        await geoInfo.save()
        res.status(201).send(geoInfo)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/geoinfos', auth, async (req, res) => {

    try {
        await req.user.populate({
            path: 'geoinfos',
        }).execPopulate()
        res.send(req.user.geoinfos)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/geoinfos/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const geoInfo = await GeoInfo.findOne({
            _id,
            owner: req.user._id
        })

        if (!geoInfo) {
            return res.status(404).send()
        }

        res.send(geoInfo)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/geoinfos/:id', auth, async (req, res) => {
    try {
        const geoinfo = await GeoInfo.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })

        if (!geoinfo) {
            res.status(404).send()
        }

        res.send(geoinfo)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router