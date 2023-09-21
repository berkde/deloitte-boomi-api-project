const sendOrderRequests = async (req,res,err) =>{
    try {
        if(req.body.records.length !== 0){
            let records = req.body.records;
            let length = records.length;
            let referenceId = req.body.referenceId;
            let index = 0;

                let queue = [];
                
                for(let i = 0; i < length ; i++){    
                    let oggeto = records[i];
                    let nuovoOggeto = {
                        id: referenceId + index,
                        order_id: oggeto.ShippyProOrderId__c,
                        URL: oggeto.PdpUrl__c,
                    };

                    index++;
                    queue.push(nuovoOggeto);
                }

                let firstSet = queue.slice(0, records.length / 2 );
                let lastSet = queue.slice(records.length / 2, records.length);
                
                setTimeout( async () => await callApi(firstSet) , 1000 * length);
                await callApi(lastSet);
                
                setTimeout( async () => res.status(201).send("OK"), 1000 * records.length);
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