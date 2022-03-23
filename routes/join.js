const express=require('express');
const router= new express.Router();

const joinController=require('../controller/join');

router.get('/', joinController.getAll);

module.exports=router;