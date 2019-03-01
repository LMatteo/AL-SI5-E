var app = angular.module("myShoppingList", []);
app.controller("myCtrl", function ($scope) {

    $scope.from = "";
    $scope.to = "";
    $scope.travels = [];
    $scope.transporterName = "";
    $scope.contracts = [];
    var url_prefix = 'http://localhost:8080/';


    $scope.searchTravels = function () {
        const Http = new XMLHttpRequest();
        const url = url_prefix + 'blabla-move-backend/travels?departure=' + $scope.from + '&destinaton=' + $scope.to;
        Http.open("GET", url);
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                $scope.travels = result;
                console.log(result);
                $scope.$apply();
            }
        };
        Http.send();
    }



    $scope.chooseTravel = function (travel) {
        const Http = new XMLHttpRequest();
        const url = url_prefix + 'blabla-move-backend/travels/' + travel.id + '/transporter';
        $scope.transporterId = travel.transporter.id;
        Http.open("PUT", url, true);
        Http.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({ 'transporterName': $scope.transporterName });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        Http.send(data);
        getContracts();
    }

    function getContracts() {
        const Http = new XMLHttpRequest();
        const url = url_prefix + 'blabla-move-backend/contracts';
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            // XMLHttpRequest.DONE === 4
            if (e.target.readyState === 4) {
                if (e.target.status === 200) {
                    if (Http.responseText !== undefined && Http.responseText !== null) {
                        $scope.contracts = JSON.parse(Http.responseText);
                        $scope.contracts.forEach(function (contrat) {
                            contrat.price = 0;
                            contrat.policies.forEach(function (police) {
                                police.checked = true;
                                contrat.price += police.price;
                            });
                        });
                        console.log($scope.contracts)
                        $scope.$apply();
                    }
                }
            }
        }
    }

    $scope.subscribe = function (contractId) {
        const Http = new XMLHttpRequest();
        const url = url_prefix + 'blabla-move-backend/subscriptions';
        Http.open("POST", url, true);
        Http.setRequestHeader("Content-type", "application/json");

        var data = JSON.stringify({ "contractId": contractId, "customerId": $scope.transporterId });
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Subcribe successfull : " + this.responseText);
            }
        };
        Http.send(data);
    }

    $scope.checkChanged = function (contract) {
        contract.price = 0;
        contract.policies.forEach(function (police) {
            if (police.checked) {
                contract.price += police.price
            } 
        });
    }

});

