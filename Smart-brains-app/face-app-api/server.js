const express= require('express');
const bodyparser= require('body-parser');
const bcrypt= require('bcryptjs');
const cors= require('cors');
const knex=require('knex');

const signin=require('./controllers/signin');
const register=require('./controllers/register');
const profile=require('./controllers/profile');
const entries=require('./controllers/entries');

const database=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ahmadniaz',
    database : 'smartbrain'
  }
});

const app=express();
app.use(cors());
app.use(bodyparser.json());

app.get('/', (req, res)=>{res.send(dataBase.user)});
app.post('/signin', (req, res)=> {signin.handleSignin(req, res, database, bcrypt)})
app.post('/register', (req, res)=> {register.handleRegister(req, res, database, bcrypt)})
app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, database)})
app.put('/image', (req, res)=>{entries.handleEntries(req, res, database)})
app.post('/imageUrl', (req, res)=>{entries.handleApi(req, res)})


app.listen(4000, 'localhost',()=>{
   console.log('everything is fine');
})
