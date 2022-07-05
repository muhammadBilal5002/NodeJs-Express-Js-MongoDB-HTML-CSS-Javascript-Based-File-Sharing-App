const express = require("express")
const File = require("../model/file")
const router = express.Router()

router.get("/:uuid",async (req,res)=>{
    const req_uuid = req.params.uuid
    const query = {uuid:req_uuid}
    const result = await File.findOne(query)
    if(!result){
        return res.send("<h1>File Link Has Been Expired</h1>")
    }
    res.download(require("path").join(__dirname,"../",result.path))

})


module.exports = router