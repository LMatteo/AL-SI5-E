

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
    $scope.objects = [{ name: "", type: "hightech" }]
    $scope.contractSearched = [];
    $scope.showContracts = false;

    if ($scope.contracts === null || $scope.contracts === undefined) {
        console.log()
        initContracts();
    }

    function getContracts() {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:8080/blabla-move-backend/contracts';
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            if (Http.responseText !== undefined && Http.responseText !== null) {
                $scope.contracts = JSON.parse(Http.responseText);
                console.log($scope.contracts)
                $scope.$apply();
            }
        }
    }

    function initContracts() {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:8080/blabla-move-backend/contracts';
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            if (JSON.parse(Http.responseText).length == 0) {
                var typename1 = "fragile"
                var typename2 = "hightech"
                var typename3 = "heavy"
                var description1 = "Vous déménagez ou bien souhaitez ponctuellement assurer des marchandises que vous confiez à un transporteur ?";
                var description2 = "Vous êtes un professionnel du transport ? Il vous faut couvrir votre responsabilité vis à vis des marchandises qui vous sont confiées."
                var mail1 = "axaAssurance@axa.fr";
                var mail2 = "leLynx@llx.fr";
                var data1 = JSON.stringify({ "contract": { "typeName": typename1, "description": description1, "mail": mail1 } });
                var data2 = JSON.stringify({ "contract": { "typeName": typename2, "description": description2, "mail": mail2 } });
                var data2 = JSON.stringify({ "contract": { "typeName": typename3, "description": description1, "mail": mail2 } });
                addContractwithParams(typename1, mail1, description1);
                addContractwithParams(typename2, mail2, description2);
                addContractwithParams(typename3, mail2, description1)
            }
        }
        getContracts();
    }

    function addContractwithParams(type, mail, description) {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:8080/blabla-move-backend/contracts';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ "contract": { "typeName": type, "description": description, "mail": mail } });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText)
            }
        };
        Http.send(data);
    }

    $scope.addContract = function () {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:8080/blabla-move-backend/contracts';
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
        const url = 'http://localhost:8080/blabla-move-backend/calculator';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ "action": "searchType", "request": { "objects": $scope.objects } });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $scope.getType = JSON.parse(this.responseText).type;  // getType of contracts
                console.log(this.responseText);
                getContractsByType();
            }
        };
        Http.send(data);
    }


    var getContractsByType = function () {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:8080/blabla-move-backend/contracts/' + $scope.type;
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


    var addPrice = function () {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:8080/blabla-move-backend/calculator';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ "action": "calculatePrice", "request": { "from": $scope.from, "to": $scope.to, "contracts": $scope.contractSearched, "objects": $scope.objects, "type": $scope.type } });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $scope.contractSearched = JSON.parse(this.responseText);  // contracts with prices
                console.log($scope.contractSearched);
                $scope.showContracts = true;
                $scope.$apply();
            }
        };
        Http.send(data);
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

    $scope.addObject = function () {
        $scope.objects.push({ name: "", type: "hightech" })
    }

    $scope.subscribe = function (mail, type, description) {
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:8080/blabla-move-backend/subscriptions';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ "subcribe": { "name": $scope.name, "email": mail, "phone": $scope.phone, "description": description, "typeName": type } });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Subcribe successfull : " + this.responseText);
            }
        };
        Http.send(data);
    }

});

