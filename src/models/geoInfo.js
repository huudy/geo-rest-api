const mongoose = require('mongoose')

const geoInfoSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
        trim: true
    },
    hostname: {
        type: String,
    },
    type: {
        type: String,
    },
    continent_code: {
        type: String,
    },
    continent_name: {
        type: String,
    },
    country_name: {
        type: String,
    },
    region_code: {
        type: String,
    },
    region_name: {
        type: String,
    },
    city: {
        type: String,
    },
    zip: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    location: {
        geoname_id: {
            type: Number,
        },
        capital: {
            type: String,
        },
        languages: [{
            code: {
                type: String
            },
            name: {
                type: String
            },
            native: {
                type: String
            }
        }],
        country_flag: {
            type: String,
        },
        country_flag_emoji: {
            type: String,
        },
        country_flag_emoji_unicode: {
            type: String,
        },
        calling_code: {
            type: String,
        },
        is_eu: {
            type: Boolean,
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

geoInfoSchema.methods.toJSON = function () {
    const geoInfo = this
    const geoInfoObj = geoInfo.toObject()

    delete geoInfoObj.location.languages._id
    delete geoInfoObj.tokens
    delete geoInfoObj.avatar

    return geoInfoObj
}

const GeoInfo = mongoose.model('GeoInfo', geoInfoSchema)

module.exports = GeoInfo