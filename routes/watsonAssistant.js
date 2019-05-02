
var express = require('express');
var router  = express.Router();
const watsonAssistant = require('../config/watsonConfig.js');

router.post('/',function(req,res,next){
    var{text,context} = req.body;
    context = JSON.parse(context);

    const params ={
        input:{ text } ,
        workspace_id: 'c38a622d-4426-4e7a-93e8-b2b9f93200b8',
        context
    };

    watsonAssistant.message(
        params,
        function(err,response){
            if(err)
            res.json({status:'ERRO',data:err});
            else{
                res.json ({status: 'OK', data:response});
            }
        }
    );
});
module.exports= router;