document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&language=' + lang;
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});

var map;

function initMap()
{
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  map.setOptions({
                  mapTypeControl: true,
                  mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: [ 'roadmap', 'satellite']
                    }              
                  });

  const trafficLayer = new google.maps.TrafficLayer();

  const buttonOptions = {
            name: 'Traffic',
            position: google.maps.ControlPosition.TOP_LEFT,
            gmap: map
        }

  let trafLayer = false;
  function buttonControl(options){
         const control = document.createElement('DIV');
         control.innerHTML = options.name;
         control.className = 'button';
         control.index = 1;

         // Add the control to the map
         options.gmap.controls[options.position].push(control);

         // When the button is clicked toggle the taffic view
         google.maps.event.addDomListener(control, 'click', options.action);
         return control;
  }

  buttonOptions.action = ()=> {
        if(!trafLayer){
          trafficLayer.setMap(map);
          button.classList.add("button-selected");
        }else{
          trafficLayer.setMap(null);
          button.classList.remove("button-selected");
        }
        trafLayer = !trafLayer;
      }
  button = new buttonControl(buttonOptions);

  fetch('markers.json')
    .then(resp => resp.json())
    .then(plotMarkers);
}

var markers;
var bounds;

function plotMarkers(m)
{
  markers = [];
  bounds = new google.maps.LatLngBounds();

  m.forEach(function (marker) {
    var position = new google.maps.LatLng(marker.lat, marker.lng);

    markers.push(
      new google.maps.Marker({
        position: position,
        map: map,
        icon: "./images/Bubble-Pink-icon64.png",
        animation: google.maps.Animation.DROP
      })
    );

    bounds.extend(position);
  });

  map.fitBounds(bounds);
}