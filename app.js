const express = require('express');
const app = express();
const ejs = require('ejs');
const request = require('request');

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
	res.render('index');
});

app.listen(3000,()=>{
	console.log('listening at 3000...');
});