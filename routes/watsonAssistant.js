
var express = require('express');
var router  = express.Router();
const watsonAssistant = require('../config/watsonConfig.js');

router.post('/',function(req,res,next){
    var{text,context} = req.body;
    context = JSON.parse(context);

    const params ={
        input:{ text } ,
        workspace_id: '18ab960f-47b2-4dce-a62e-46d5b685da82',
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