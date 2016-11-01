// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var map;
var regions;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    minZoom: 5,
    center: {lat: 38.9072, lng: -77.0369},
    mapTypeId: 'roadmap'
  });
  initAutocomplete();
console.log("initMap is firing")
  $.ajax({
    url: "http://localhost:3000/regions",
    type: "GET",
    dataType: "json"
  }).done((result) => {
    regions = result
    console.log(regions)
    eqfeed_callback(regions)

  });

  function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 38.9072, lng: -77.0369},
      zoom: 12,
      minZoom: 5,
      mapTypeId: 'roadmap'
    });
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    console.log(input)
    var searchBox = new google.maps.places.SearchBox(input);
    console.log("initAutocomplete")
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
}



function eqfeed_callback(regions) {
  var heatmapData = [];
  for (var i = 0; i < regions.length; i++) {
    var latLng = new google.maps.LatLng(regions[i].lat, regions[i].long);
    var rentMagnitude = (regions[i].rent)
    heatmapData.push({location: latLng, weight: rentMagnitude});
  }
console.log("heatmap")
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: true,
    radius: 60,
    maxIntensity: 100000,
    map: map
  });
  // google.maps.event.addListener(map, 'zoom_changed', function() {
  //   if (map.zoom < 9){
  //     heatmap.radius = (map.zoom * 2)
  //   } else {
  //     heatmap.radius = (map.zoom * 7)
  //   }
  //   console.log(`zoom is ${map.zoom}`)
  //   console.log(`radius is ${heatmap.radius}`)
  // })
}

// function initialize(){
// initMap();
// initAutocomplete();
//
//
//   console.log("initialize is firing")
// }
