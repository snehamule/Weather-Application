var app = angular.module('MyApp', [])
    app.controller('MyController', function ($scope, $window, $http) {
    $scope.Temp;
    $scope.getWeather = function(name,country){        
      if($scope.Name == undefined  || name == undefined || name ==""){
        $scope.Name = "Pittsburgh";
        $scope.Country="PA";
      }else{
        $scope.Name = name;
        $scope.Country=country;
      }  
      var url = 'https://query.yahooapis.com/v1/public/yql?'
      +'q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20'
      +'(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+$scope.Name
      +'%2C%20'+$scope.Country+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
      $http.get(url).success(function(data, status, headers, config) {			 
      $scope.Temp = data.query.results.channel.item.condition.temp; 
      console.log('Temperature is '+ $scope.Temp); 
      //window.alert("Temperature is "+ $scope.Temp);

        }).
        error(function(data, status, headers, config) {
          //log error
        });
        
        return  $scope.Temp;
   };
    //WeatherData Array to store Data
    $scope.WeatherData = [];
    $scope.Add = function () {
        //Add the new item to the Array.
        var weather = {};
        weather.Name = $scope.Name;
        weather.Country = $scope.Country;
        weather.Temp=$scope.Temp
        $scope.WeatherData.push(weather);

        //Clear the TextBoxes.
        $scope.Name = "";
        $scope.Country = "";
        $scope.Temp="";
    };

  
  $scope.Remove = function (index) {
      //Find the record using Index from Array.
      var name = $scope.WeatherData[index].Name;
      if ($window.confirm("Do you want to delete: " + name)) {
          //Remove the item from Array using Index.
          $scope.WeatherData.splice(index, 1);
     }
  }
});
