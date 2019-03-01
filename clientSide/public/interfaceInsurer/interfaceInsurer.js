

var app = angular.module("myShoppingList", []);
app.controller("myCtrl", function ($scope) {

    $scope.name = "";
    $scope.mail = "";
    $scope.phone = "";
    $scope.getType = "hightech";
    $scope.from = "";
    $scope.to = "";
    $scope.bestContracts = [];
    $scope.activateBestContracts = false;
    $scope.policies = [{ name: "", price: "" }]
    $scope.contractSearched = [];
    $scope.showContracts = false;
    var url_prefix = 'http://localhost:8080/'

    if ($scope.contracts === null || $scope.contracts === undefined) {
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
        const url = 'http://localhost:8080/blabla-move-backend/contracts';
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
        const url = url_prefix+'/blabla-move-backend/contracts';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ "contract": { "typeName": document.getElementById('inputtype').value, "description": document.getElementById('inputdescription').value, "mail": document.getElementById('inputmail').value, "policies": $scope.policies } });
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


    var getContractsByType = function () {
        const Http = new XMLHttpRequest();
        const url = url_prefix+'/blabla-move-backend/contracts/' + $scope.type;
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            if (Http.responseText !== undefined && Http.responseText !== null) {
                $scope.contractSearched = JSON.parse(Http.responseText); // contracts
                console.log($scope.contractSearched);
                addPrice();
            }
        }
    }



    $scope.findBestContract = function () {
        $scope.bestContracts = [];
        var maxPrice = 1000;
        $scope.contractSearched.forEach(function (element) {
            if (element.price < maxPrice) {
                maxPrice = element.price;
            }
        });
        $scope.contractSearched.forEach(function (element) {
            if (element.price === maxPrice) {
                $scope.bestContracts.push(element)
            }
        });
        $scope.activateBestContracts = true;
    }

    $scope.addPolice = function () {
        $scope.policies.push({ name: "", price: "" })
    }

});

