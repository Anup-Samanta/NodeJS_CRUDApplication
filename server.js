const express = require("express");
const bodyperser = require("body-parser");
const cool = require('cool-ascii-faces');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyperser.json())



//Database connection DavjwPvkX1AxSI0l
MongoClient.connect('mongodb+srv://anupsamanta:DavjwPvkX1AxSI0l@cluster0.q9pztnu.mongodb.net/?retryWrites=true&w=majority', 
	{ useUnifiedTopology: true })
.then(client => {
	
	console.log("connected to database")
	
	const db = client.db('my_record'); //Selecting DB
	const studentsCollection = db.collection('Students'); //Selecting collection



	// All your handlers here...
	app.get('/', (req, res) => {
		res.sendfile(__dirname + '/index.html')
		
	});

	app.get('/cool', (req, res) => {
		res.send(cool())
	});

	app.post('/save', (req, res)=>{
		studentsCollection.insertOne(req.body)
		.then(result => {
			res.redirect('/')
		})
		.catch(err => {
			console.error(err)
		})
	});

	app.get('/view', (req, res)=>{
		const cursor = db.collection('Students').find().toArray()
		.then(results =>{
			res.render('index.ejs', {students : results})
		})
		.catch(err => console.error(err))
	});

	app.put('/view', (req, res) => { //PUT is for Updating
		studentsCollection.findOneAndUpdate(
			{name: "Sandip"},
			{
				$set:{
					name: req.body.name,
					email:req.body.email
				}
			},
			{
				upsert: true
			}
		)
		.then(result => {
			res.json('Success')
		})
		.catch(err => {
			console.error(err)
		})
	})

	app.delete('/view', (req, res) => { //Delete is for deleting
		studentsCollection.deleteOne(
		{name : req.body.name}
		)
		.then(result =>{
			if(result.deletedCount == 0){
				return res.json('No Student to delete')
			}
			res.json('Delete')
		})
		.catch(error => {
			console.error(error)
		})
	})
})
.catch(err => console.error(err)); //if (err) return console.error(err)


// Make sure you place body-parser before your CRUD handlers!
app.use(bodyperser.urlencoded({ extended: true }))




//Server connection
app.listen(8000, () =>{
	console.log("Server running on Port 8000!");
})

// const cool = require('cool-ascii-faces');
// const express = require('express');
// const app = express();
// const path = require('path');
// const PORT = process.env.PORT || 5000;


// app.use(express.static(path.join(__dirname, 'public')))
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')
// app.get('/', (req, res) => res.render('pages/index'))
// app.get('/cool', (req, res) => res.send(cool()))
// app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
