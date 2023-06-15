const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb url here`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonenumber = mongoose.model('Number', phoneSchema)

if (process.argv.length === 3) {
  Phonenumber.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(number => {
      console.log(number.name, number.number)
    })
    mongoose.connection.close()
  })
} else {
  const phonenumber = new Phonenumber({
    name: name,
    number: number,
  })
  phonenumber.save().then(result => {
    console.log(`added ${name}, ${number} to the phonebook`)
    mongoose.connection.close()
  })
}