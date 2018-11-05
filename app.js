const express = require('express');
const app = express();
const body_parser = require('body-parser');
const ejs = require('ejs');
const request = require('request');

app.use(body_parser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
	res.render('index', {sun_data: null});
});

app.post('/',(req,res)=>{
	console.log('request: ' + req.body.latitude + ', '+ req.body.longitude);
	let lat = req.body.latitude;
	let lng = req.body.longitude
	let url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`;
	request(url,(err,resp,body)=>{
		if(err){
			console.log(`Error: ${err}`);
			res.render('index', {sun_data: null});
		} else {
			let data = JSON.parse(body);
			if(data.results == undefined){
				console.log(`Error: ${err}`);
				res.render('index', {sun_data: null});
			} else {
				console.log('request success: ');
				console.log(data.results);
				res.render('index', {sun_data: data})
			}
		}
	});
});

app.listen(3000,()=>{
	console.log('listening at 3000...');
});