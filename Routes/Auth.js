const express = require('express');
const UserController = require('../Controller/UserController');

class ProducteRoutes{
    constructor() { 
        this.router = express.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes(){
     
    }
    postRoutes(){
        this.router.post('/sendOtp',UserController.SendEmailOTP)
        this.router.post('/createuser',UserController.CreateUser)
        this.router.post('/login',UserController.Login)
        // this.router.post( '/Texttoimg',UserController.GenImage)
     } patchRoutes(){
      
    }
    deleteRoutes(){
       
    }
}
module.exports = new ProducteRoutes().router