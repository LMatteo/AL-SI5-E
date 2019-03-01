var app = angular.module("myShoppingList", []);
app.controller("myCtrl", function ($scope) {

    $scope.name = "";
    $scope.mail = "";
    $scope.phone = "";
    $scope.from = "";
    $scope.to = "";
    $scope.bestContracts = [];
    $scope.activateBestContracts = false;
    $scope.objects = [{ name: "", type: "hightech" }]
    $scope.contractSearched = [];
    $scope.showContracts = false;
    $scope.checkaccident = false;
    $scope.checkfires = false;
    $scope.checksteals = false;
    $scope.idContract = "";
    var url_prefix = 'http://localhost:8080/'

    if ($scope.contracts === null || $scope.contracts === undefined) {
        console.log()
        initContracts();
    }

    function getContracts() {
        const Http = new XMLHttpRequest();
        const url = url_prefix+'blabla-move-backend/contracts';
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            // XMLHttpRequest.DONE === 4
            if (e.target.readyState === 4) {
                if (e.target.status === 200) {
                    if (Http.responseText !== undefined && Http.responseText !== null) {
                        $scope.contracts = JSON.parse(Http.responseText);
                        console.log($scope.contracts)
                        $scope.$apply();
                    }
                }
            }
        }
    }

    function initContracts() {
        const Http = new XMLHttpRequest();
        const url = url_prefix+'blabla-move-backend/contracts';
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            // XMLHttpRequest.DONE === 4
            if (e.target.readyState === 4) {
                if (e.target.status === 200) {
                    console.log("Réponse reçue: %s", e.target.responseText);
                    if (JSON.parse(e.target.responseText).length == 0) {
                        var typename1 = "fragile"
                        var typename2 = "hightech"
                        var typename3 = "heavy"
                        var description1 = "Vous déménagez ou bien souhaitez ponctuellement assurer des marchandises que vous confiez à un transporteur ?";
                        var description2 = "Vous êtes un professionnel du transport ? Il vous faut couvrir votre responsabilité vis à vis des marchandises qui vous sont confiées."
                        var mail1 = "axaAssurance@axa.fr";
                        var mail2 = "leLynx@llx.fr";
                        var policies1 = [{ "name":"police1","price":456},{ "name":"police2","price":226}];
                        var policies2 = [{ "name":"mamoute","price":86 }];
                        var policies3 = [{ "name":"dino","price":26 }];

                        addContractwithParams(typename1, mail1, description1, policies1);
                        addContractwithParams(typename2, mail2, description2, policies2);
                        addContractwithParams(typename3, mail2, description1, policies3);
                    }
                } else {
                    console.log("Status de la réponse: %d (%s)", e.target.status, e.target.statusText);
                }
            }            
        }
        getContracts();
    }

    function addContractwithParams(type, mail, description, policies) {
        const Http = new XMLHttpRequest();
        const url = url_prefix+'blabla-move-backend/contracts';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ "contract": { "typeName": type, "description": description, "mail": mail, "policies" : policies } });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText)
            }
        };
        Http.send(data);
    }

    $scope.addContract = function () {
        const Http = new XMLHttpRequest();
        const url = url_prefix+'blabla-move-backend/contracts';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ "contract": { "typeName": document.getElementById('inputtype').value, "description": document.getElementById('inputdescription').value, "mail": document.getElementById('inputmail').value } });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                getContracts()
            }
        };
        Http.send(data);
    }

    $scope.setVisibleForm = function () {
        if ($scope.showForm) {
            $scope.showForm = false;
        } else {
            $scope.showForm = true;
        }
    }

    $scope.searchContracts = function () {
        const Http = new XMLHttpRequest();
        const url = url_prefix+'blabla-move-backend/calculate/type';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ "action": "searchType", "request": { "objects": $scope.objects } });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $scope.type = JSON.parse(this.responseText).type;
                getContractsByType();
            }
        };
        Http.send(data);
    }


    var getContractsByType = function () {
        const Http = new XMLHttpRequest();
        const url = url_prefix+'blabla-move-backend/contracts/' + $scope.type;
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $scope.contractSearched = JSON.parse(Http.responseText); // contracts
                $scope.contractSearched.forEach(function (contrat) {
                    contrat.price = 0;
                    contrat.policies.forEach(function (police) {
                        police.checked = true;
                        contrat.price += police.price;
                    });
                });
                $scope.showContracts = true;

                $scope.$apply();
                console.log($scope.contractSearched);
            }     
        }
    }

    $scope.checkChanged = function (contract) {
        contract.price = 0;
        contract.policies.forEach(function (police) {
            if (police.checked) {
                contract.price += police.price
            } 
        });
    }


    


    $scope.findBestContract = function () {
        if($scope.contractSearched.length !== 0){
            $scope.bestContracts = [];
            var minPrice = $scope.contractSearched[0].price;
            $scope.contractSearched.forEach(function (element) {
                if (element.price < minPrice) {
                    minPrice = element.price;
                }
            });
            $scope.contractSearched.forEach(function (element) {
                if (element.price === minPrice) {
                    $scope.bestContracts.push(element)
                }
            });
            $scope.activateBestContracts = true;
        }
    }

    $scope.addObject = function () {
        $scope.objects.push({ name: "", type: "hightech" })
    }

    $scope.subscribe = function (contractId,customerId) {
        const Http = new XMLHttpRequest();
        const url = url_prefix+'blabla-move-backend/subscriptions';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        
        var data = JSON.stringify({ "contractId" : contractId,"customerId":customerId,"policies":[] });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Subcribe successfull : " + this.responseText);
            }
        };
        Http.send(data);
    }

    $scope.addItem = function(item,idTravel){
        const Http = new XMLHttpRequest();
        const url = url_prefix+'blabla-move-backend/travels/'+idTravel;
        Http.open("PUT", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ "itemName" : item});
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("item : "+ item +" a été ajouté");
            }
        };
        Http.send(data);
    }

    $scope.finishTravel = function(){
    }


    $scope.createTravel = function(contract){
        const Http = new XMLHttpRequest();
        const url = url_prefix+'blabla-move-backend/travels';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ "customerName": $scope.name, "departure": $scope.from,"destination":$scope.to });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                console.log(result);
                $scope.subscribe(contract.id,result.customer.id);
                $scope.objects.forEach(function(element) {
                    console.log(element);
                    $scope.addItem(element.name,result.id)
                  });
                
            }
        };
        Http.send(data);
    }

});

