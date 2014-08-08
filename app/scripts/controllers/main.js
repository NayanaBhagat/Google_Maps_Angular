'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */

 var cities = [];
    // {
    //     city : 'Toronto',
    //     desc : 'This is the best city in the world!',
    //     lat : 43.7000,
    //     long : -79.4000
    // },
    // {
    //     city : 'New York',
    //     desc : 'Awesome!',
    //     lat : 40.6700,
    //     long : -73.9400
    // },
    // {
    //     city : 'Chicago',
    //     desc : 'This is the second best city in the world!',
    //     lat : 41.8819,
    //     long : -87.6278
    // },
    // {
    //     city : 'Los Angeles',
    //     desc : 'This city is live!',
    //     lat : 34.0500,
    //     long : -118.2500
    // },
    // {
    //     city : 'Las Vegas',
    //     desc : 'Sin City...\'nuff said!',
    //     lat : 36.0800,
    //     long : -115.1522
    // },
    // {
    //   city: 'Mumbai',
    //   desc: 'City that never sleeps',
    //   lat: 19.075984,
    //   long: 72.877656
    // }


//Angular App Module and Controller

angular.module('mytodoApp')
  .controller('MainCtrl', function ($scope) {
   var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
   var createMarker = function (info){
        console.log("Are u here??");
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });

        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
         google.maps.event.addListener(marker, 'click', function(){
         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
         infoWindow.open($scope.map, marker);
         });
        
        $scope.markers.push(marker);
        
    }  
    
    

    $scope.addCity = function(place){
      $scope.cities = $scope.cities != null ? $scope.cities : [];
      $scope.cities.push(place);
      $scope.place="";
      angular.forEach($scope.cities,function(city){
      console.log("here??");
      createMarker(city);
      });
    }
    


    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});
