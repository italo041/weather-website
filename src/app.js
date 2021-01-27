const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath =  path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Fernando Bejarano'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Me',
        name: 'Fernando Bejarano'
    });
})


app.get('/help', (req,res) => {
    res.render('help', { 
        helpText: 'This is a help text example',
        title: 'Help',
        name: 'Fernando Bejarano'
    });
})
  
app.get('/weather', (req,res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error) {
            return res.send({error});
        }  
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error) {
                return res.send({error});
            }
     
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        })
    
    }) 


});



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send([{
        products:[]
    }]);
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        errorMessage: 'Help article not found',
        name: 'Fernando Bejarano'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        errorMessage: 'Page not found',
        name: 'Fernando Bejarano'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})
