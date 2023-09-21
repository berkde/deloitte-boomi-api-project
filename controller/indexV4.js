const sendOrderRequests = async (req,res,err) =>{
    try {
        let records = req.body.records;
        let totalRequests = records.length;
        let referenceId = req.body.referenceId;

        const maxNumberRequests = 200;
        let totalGroups = Math.ceil(totalRequests / maxNumberRequests);
                
        await sendRequests(referenceId,records,totalGroups,maxNumberRequests);
        res.status(201).send("OK")
    } catch(error){
        console.log(error.message);
        res.status(500).send("INTERNAL SERVER ERROR");
        //next(err);
    }
}

const sendRequests = async (referenceId,records,totalGroups,maxNumberRequests) => {
    let queue = []
    let index = 0;
            
    while(index < totalGroups){
        let length = records.length - ((totalGroups - index - 1) * maxNumberRequests);
            for(let i = 0; i < length ; i++){   
                let object = records[i]; 
                let newObject = {
                    order_id: object.ShippyProOrderId__c,
                    URL: object.PdpUrl__c,
                };
                queue.push(JSON.stringify(newObject));
            }
               
        let response = JSON.stringify({
            referenceId: referenceId + index,
            requests: queue
        });
               
        records = records.slice(length, records.length); 
        queue = []; ++index;
        await callApi(response);
    }
}


const callApi = async (response) => {
   console.log("Reference Id: " + JSON.parse(response).referenceId + "\n");
   console.log("number of requests: " + JSON.parse(response).requests.length + "\n");
   console.log("Active Requests :" + JSON.parse(response).requests.map(req => req + "\n"));
}


module.exports = { sendOrderRequests };