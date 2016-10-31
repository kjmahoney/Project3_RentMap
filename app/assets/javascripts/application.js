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

  $.ajax({
    url: "http://localhost:3000/regions",
    type: "GET",
    dataType: "json"
  }).done((result) => {
    regions = result
    // eqfeed_callback(regions)
  });
}


// function eqfeed_callback(regions) {
//   var heatmapData = [];
//   for (var i = 0; i < regions.length; i++) {
//     var zip = regions[i].zip;
//     $.ajax({
//       url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyBNYErfLDCAvSnyYNvLIVMQWo45_L6zE1E`,
//       type: "GET",
//       dataType: "json"
//     }).done((result) => {
//       var coords = result.results[0].geometry.location
//       var latLng = new google.maps.LatLng(coords.lat, coords.lng);
//       heatmapData.push(latLng);
//     })
//   }
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: false,
    map: map
  });
}
