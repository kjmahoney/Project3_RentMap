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
    console.log(regions)
    eqfeed_callback(regions)
  });
}

function eqfeed_callback(regions) {
  var heatmapData = [];
  for (var i = 0; i < regions.length; i++) {
    var zip = regions[i].zip;
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyAQ4GK5BgqFMN8Vc5srUckmB6zf3eZlL0g`,
      type: "GET",
      dataType: "json"
    }).done((result) => {
      var coords = result.results[0].geometry.location
      var latLng = new google.maps.LatLng(coords.lat, coords.lng);
      heatmapData.push(latLng);
    }).fail((result) => {
      console.log(result)
    })
  }

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: true,
    radius: (map.zoom * 10),
    map: map
  });
  google.maps.event.addListener(map, 'zoom_changed', function() {
    if (map.zoom < 9){
      heatmap.radius = (map.zoom * 2)
    } else {
      heatmap.radius = (map.zoom * 7)
    }
    console.log(`zoom is ${map.zoom}`)
    console.log(`radius is ${heatmap.radius}`)
  })
}
