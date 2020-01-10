const express = require('express');
const methodOverride = require('method-override');
const db = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////

//GET '/' - display
app.get('/', (req, res) => {

    db.widget.findAll()
    .then(widgets => {
        console.log('🌈🌈🌈' + widgets)
        res.render('index', { widgets })
    })
    .catch(err => {
        console.log(err)
        res.send('ERROR')
    })
})


//POST '/' - add widget
app.post('/', (req, res) => {
    
    db.widget.create({
        description: req.body.description,
        quantity: req.body.quantity
    })
    .then(widget => {
        console.log(widget + 'created 🌷🌷🌷')
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
        res.send('ERROR')
    })
})

//DELETE '/' - delete widget
app.delete('/', (req, res) => {
    
    db.widget.destroy({
        where: {id: req.body.id}
    })
    .then(destroyed => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
        res.send('ERROR')
    })
})

// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
