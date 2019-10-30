const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const GeoInfo = require('../../src/models/geoInfo')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({
            _id: userOneId
        }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Jess',
    email: 'jess@example.com',
    password: 'myhouse099@@',
    tokens: [{
        token: jwt.sign({
            _id: userTwoId
        }, process.env.JWT_SECRET)
    }]
}

const geoInfoOne = {
    _id: new mongoose.Types.ObjectId(),
    ip: "172.32.23.211",
    type: "ipv4",
    continent_code: "NA",
    continent_name: "North America",
    country_name: "United States",
    region_code: "IL",
    region_name: "Illinois",
    city: "Chicago",
    zip: "60608",
    latitude: 41.84885025024414,
    longitude: -87.67124938964844,
    location: {
        geoname_id: 4887398,
        capital: "Washington D.C.",
        languages: [{
            _id: "5db92750c40df56a19e306c5",
            code: "en",
            name: "English",
            native: "English"
        }],
        country_flag: "http://assets.ipstack.com/flags/us.svg",
        country_flag_emoji: "🇺🇸",
        country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
        calling_code: "1",
        is_eu: false
    },
    user: userOne._id
}

const geoInfoTwo = {
    _id: new mongoose.Types.ObjectId(),
    ip: '172.34.54.334',
    user: userOne._id
}

const geoInfoThree = {
    _id: new mongoose.Types.ObjectId(),
    ip: '172.34.54.334',
    user: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await GeoInfo.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new GeoInfo(geoInfoOne).save()
    await new GeoInfo(geoInfoTwo).save()
    await new GeoInfo(geoInfoThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    geoInfoOne,
    geoInfoTwo,
    geoInfoThree,
    setupDatabase
}