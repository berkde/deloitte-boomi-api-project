const sendOrderRequests = async (req,res,err) =>{
    try {
        if(req.body.records.length !== 0){
            let records = req.body.records;
            let length = records.length;
            let referenceId = req.body.referenceId;
            let index = 0;

            while(length > 1){
                let queue = [];
                
                for(let i = 0; i < length / 2 ; i++){
                    let oggeto = records[i];
                    let nuovoOggeto = {
                        id: referenceId + index,
                        order_id: oggeto.ShippyProOrderId__c,
                        URL: oggeto.PdpUrl__c,
                    };
                    
                    index++;
                    queue.push(nuovoOggeto);
                }
             
                records = records.slice(length/2,length);
                length = length / 2;
                
                setTimeout( async () => await callApi(queue) , 1000 * length);
                if(records.length === 1)
                {
                    res.status(201).send("OK");
                }
                
            }
        }
  
    } catch(error){
        console.log(error.message);
        //next(err);
    }
}


const callApi = async (queue) => {
    console.log("number of requests: " + queue.length + "\n");
    console.log("Active Requests :" + queue.map(req => "reference id: " + req.id + " - order id: " + req.order_id +"\n").toString());
}


module.exports = { sendOrderRequests };