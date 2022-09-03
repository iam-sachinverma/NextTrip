const express = require('express');
const fs = require('fs');
const morgan = require('morgan')

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
); 

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

const getAllTours = (req, res) => {
    res.status(200).json({
        'status': 'success',
        data: {
            tours
        }
    });
}

const getTour = (req, res) => {
    
    console.log(req.requestTime);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }
    
    res.status(200).json({
        'status': 'success',
        'created_at': req.requestTime,
        data:{
            tour
        }
    })
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId},  req.body);
    
    tours.push(newTour);
 
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
       res.status(201).json({
         status:"success",
         data:{
             tour: newTour
         }
       })
    })
}

const updateTour = (req, res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid id'
        })
    }

    res.status(200).json({
        status: 'success',
        data:{
            tour: 'Update Tour will be here'
        }
    })
}

const deleteTour = (req, res)=>{
    if(req.params.id > tours.length){
        return res.status(404).json({
            status:'success',
            message:'Invalid id'
        })
    }

    res.status(204).json({
        status:'success',
        data: null
    })
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status:'error',
        message:'This route is not define yet...'
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status:'error',
        message:'This route is not define yet...'
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status:'error',
        message:'This route is not define yet...'
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status:'error',
        message:'This route is not define yet...'
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status:'error',
        message:'This route is not define yet...'
    })
}

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})