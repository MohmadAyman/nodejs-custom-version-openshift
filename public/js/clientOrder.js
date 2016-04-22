  var expressNode = angular.module('expressNode', []);

  function mainController($scope, $http, $rootScope,$timeout) {
    $scope.services = [];
    var recivedOrder = [];
    $scope.Orders = [];
    var usersOrders = [];
    $scope.usersOrders = [];
    $scope.names = [];
    var numberOrderStatic = 1;
  // TODO when landing on the page, get all orders that have not been served and display them.
  $scope.initialize = function() {
  };
function pad(n) { return n < 10 ? '0' + n : n };

  var upView = function () {
    $scope.$apply();
    $scope.services = $scope.services;
  };

  socket.on('reciveOrder', function (data) {
    menuToOrderes(data); 
    $scope.names.push(data[0]);
    console.log('recived  order');
    upView();
  });

// setInterval($scope.Refresh, 2000);

// Weired bug, had to do two loops.
// TODO
// Add the orders to the collection.
var menuToOrderes = function (data) {
 $scope.services = data[1];
 angular.forEach($scope.services, function(s){
  if (s.active){
  }
  else{
    $scope.removeOrder(s);
  }
});
 angular.forEach($scope.services, function(s){
  if (s.active){
  }
  else{
    $scope.removeOrder(s);
  }
});
 // TODO, add have been waiting for feild.
    d = new Date();
    s = pad(d.getHours()) + ":"
    + pad(d.getMinutes()) + "\n";
    data[0] = data[0] + " ----- " + "Ordered @ " + s;
  $scope.usersOrders.push(data);
}

// TODO 
// remove the order from the collection.
$scope.removeOrder = function(s) {
  $scope.services.splice($scope.services.indexOf(s), 1);
}

// TODO 
// remove the order from the collection.
$scope.userDone = function(s) {
  console.log('Orders for this user: ' + s[1].length + 'at postion: ' + $scope.usersOrders.indexOf(s));
  $scope.usersOrders.splice($scope.usersOrders.indexOf(s), s[1].length);
}

}