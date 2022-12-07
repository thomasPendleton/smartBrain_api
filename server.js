const express = require('express')
const app = express()
const cors = require('cors')
const signIn = require('./controllers/signin')
const register = require('./controllers/register')
const {getImage, handleApiCall} = require('./controllers/image')
const bcrypt = require('bcrypt-nodejs')
const { getProfile } = require('./controllers/profile')

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'home',
      database : 'smartbrain'
    }
  });
// port:  3306
//   knex.select()
//   .table('users').then(data => console.log(data))
  

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send(knex
      .select()
  .table('users').then(data => console.log(data)))
})

// Sign In
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, knex, bcrypt)} )

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt) })

app.get('/profile/:id', (req, res) => {getProfile(req, res, knex)})

app.put('/image', (req, res) => { getImage(req, res, knex) })

app.post('/imageurl', (req, res) => { handleApiCall(req, res) })

app.listen(3000, () => {
    console.log('app is running on 3000');
})
