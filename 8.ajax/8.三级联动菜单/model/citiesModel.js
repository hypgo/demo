let mongoose = require('mongoose')
let Schema = mongoose.Schema

let citiesRule = new Schema()

module.exports = mongoose.model('cities',  citiesRule)