const sendOrderRequests = async (req,res,err) =>{
    try {
        let records = req.body.records;
        let richestiTotale = records.length;
        let referenceId = req.body.referenceId;

            if(richestiTotale !== 0 && richestiTotale > 200){
                const massimoNumeroRichesti = 200;
                let gruppiTotale = Math.ceil(richestiTotale / massimoNumeroRichesti);
                
                await richiesti(referenceId,records,gruppiTotale,massimoNumeroRichesti);

            } else {
                
                await richiesti(referenceId,records);

            }
        res.status(201).send("OK")
    } catch(error){
        console.log(error.message);
        res.status(500).send("INTERNAL SERVER ERROR");
        //next(err);
    }
}

const richiesti = async (referenceId,records,gruppiTotale = 0,massimoNumeroRichesti = 0) => {
    let queue = []
    let index = 0;
        if(gruppiTotale === 0){
            for(let i = 0; i < records.length ; i++){    
                let oggeto = records[i];
                let nuovoOggeto = {
                    order_id: oggeto.ShippyProOrderId__c,
                    URL: oggeto.PdpUrl__c,
                };
                queue.push(JSON.stringify(nuovoOggeto));
            }

                let response = JSON.stringify({
                    referenceId: referenceId + index,
                    requests: queue
                });
            
            await callApi(response);
        
        } else {
            while(index < gruppiTotale){
                let length = records.length - ((gruppiTotale - index - 1) * massimoNumeroRichesti);
                for(let i = 0; i < length ; i++){   
                    let oggeto = records[i]; 
                    let nuovoOggeto = {
                        order_id: oggeto.ShippyProOrderId__c,
                        URL: oggeto.PdpUrl__c,
                    };
                    queue.push(JSON.stringify(nuovoOggeto));
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
}


const callApi = async (response) => {
   console.log("Reference Id: " + JSON.parse(response).referenceId + "\n");
   console.log("number of requests: " + JSON.parse(response).requests.length + "\n");
   console.log("Active Requests :" + JSON.parse(response).requests.map(req => req + "\n"));
}


module.exports = { sendOrderRequests };