const request = require('supertest')
const app = require('../src/app')
const GeoInfo = require('../src/models/geoInfo')
const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    geoInfoOne,
    geoInfoTwo,
    geoInfoThree,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create geoInfo for user', async () => {
    const response = await request(app)
        .post('/geoInfos')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            ip: '172.32.23.211'
        })
        .expect(201)
    const geoInfo = await GeoInfo.findById(response.body._id)
    expect(geoInfo).not.toBeNull()
    expect(geoInfo.continent_code).toEqual(geoInfoOne.continent_code)
    expect(geoInfo.city).toEqual(geoInfoOne.city)
    expect(geoInfo.country_name).toEqual(geoInfoOne.country_name)
})

test('Should fetch user geoInfos', async () => {
    const response = await request(app)
        .get('/geoInfos')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users geoInfos', async () => {
    const response = await request(app)
        .delete(`/geoInfos/${geoInfoOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const geoInfo = await GeoInfo.findById(geoInfoOne._id)
    expect(geoInfo).not.toBeNull()
})