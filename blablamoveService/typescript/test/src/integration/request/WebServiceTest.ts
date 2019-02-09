import fetch = require("node-fetch");
import assert = require('assert');
const path = 'http://localhost:8080/blabla-move-backend';

describe('webservice test', function () {
    let array : [] = [];


    it('should get a list of contract', async function () {
        let res = await fetch.default(path+'/contracts/hightech');
        assert.strictEqual(res.status,200)
    });

    it('should add contract', async function() {
        let contract = {
            contract : {
                typeName : 'hightech',
                description : 'salut',
                mail : 'lucas.leMatteo@mail.fr',
                policies : array,
            }
        };

        let contractPost = await fetch.default(path+'/contracts/',
            {method : 'POST', body : JSON.stringify(contract), headers: { 'Content-Type': 'application/json' },
            });

        let id = (await contractPost.json()).id;

        let contractGet = await fetch.default(path+'/contracts/id/' + id);

        assert.strictEqual(id,(await contractGet.json()).id)

    });

    xit('should subscribe a user', async function() {
       let travel = {
            customerName : "thierry",
            departure : "nice",
            destination : "paname"
       };
       let newTravelRequest = await fetch.default(path+'/travels/',
           {method : 'POST', body : JSON.stringify(travel), headers: { 'Content-Type': 'application/json' },
           });
       let custoId = (await newTravelRequest.json()).id;

        let contract = {
            contract : {
                typeName : 'hightech',
                description : 'salut',
                mail : 'lucas.leMatteo@mail.fr',
                policies : array,
            }
        };


       let contractPost = await fetch.default(path+'/contracts/',
           {method : 'POST', body : JSON.stringify(contract), headers: { 'Content-Type': 'application/json' },
           });
       let contractId = (await contractPost.json()).id;

       let subs = {
           customerId : custoId,
           contractId : contractId
       };

       let subsPost = await fetch.default(path+'/subscriptions/',
        {method : 'POST', body : JSON.stringify(subs), headers: { 'Content-Type': 'application/json' },
        });

       console.log(subsPost)



    })
});