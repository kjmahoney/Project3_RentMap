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
    zoom: 8,
    minZoom: 5,
    center: {lat: 38.9072, lng: -77.0369},
    mapTypeId: 'roadmap',
    scaleControl: true
  });
  var layer = new google.maps.FusionTablesLayer({
    query: {
      select: 'geometry',
      from: '1oUHvuUMkzN23i9l59qfpJfUhltfH5cpPdNasx6Al'
    },
    styles: [{
      where: 'Rent > 1842',
      polygonOptions: {
        fillColor: '#FF0000'
      }
    }, {
      where: 'Rent > 1411',
      polygonOptions: {
        fillColor: '#FFA500'
      }
    }, {
      where: 'Rent > 1193',
      polygonOptions: {
        fillColor: '#FFFF00'
      }
    }, {
      where: 'Rent > 988',
      polygonOptions: {
        fillColor: '#32CD32'
      }
    }, {
      where: 'Rent > 495',
      polygonOptions: {
        fillColor: '#00FF00'
      }
    }]
  });
  layer.setMap(map);
}
