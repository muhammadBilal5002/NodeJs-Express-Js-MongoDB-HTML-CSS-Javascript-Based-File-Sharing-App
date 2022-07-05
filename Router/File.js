const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const FileModel = require('../model/file')
const { v4: uuidv4 } = require('uuid');


router.post("/",(req,res)=>{
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"./upload/")
        },
        filename:(req,file,cb)=>{
            const unique = `${Date.now()}-${Math.round(Math.random()*1E9)}${require('path').extname(file.originalname)}`
            cb(null, unique)
        }
    })
    const upload = multer({
        storage,
        limits:{
            fileSize:1000000*10000
        }
    }).single("myfile")
    
    upload(req,res,async(err)=>{
        if(err){
            return res.send({Error_Message:err})
        }
        const file = new FileModel({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });
        const response = await file.save();
         res.send({Link:`${process.env.Base_Url}myfile/${response.uuid}`})
    })
})


module.exports = router
