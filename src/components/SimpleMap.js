import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import '../css/button.css';

export default function SimpleMap (props) {
  let button;
  const trafficLayer = new props.globalGM.TrafficLayer();

  const buttonOptions = {
            name: 'Traffic',
            position: props.globalGM.ControlPosition.TOP_LEFT,
        }

  let trafLayer = false;
  const buttonControl = (options) => {
         const control = document.createElement('DIV');
         control.innerHTML = options.name;
         control.className = 'button';
         control.index = 1;

         // Add the control to the map
         options.gmap.controls[options.position].push(control);

         // When the button is clicked toggle the taffic view
         props.globalGM.event.addDomListener(control, 'click', options.action);
         return control;
  }

  return (
    <section style={{height: "100%"}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={ref => {
                  ref.props.map.setOptions({
                  mapTypeControl: true,
                  mapTypeControlOptions: {
                    style: props.globalGM.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: [ 'roadmap', 'satellite']
                    }              
                  });
                  buttonOptions.gmap = ref.props.map;
                  buttonOptions.action = ()=> {
                    if(!trafLayer){
                      trafficLayer.setMap(ref.props.map);
                      button.classList.add("button-selected");
                    }else{
                      trafficLayer.setMap(null);
                      button.classList.remove("button-selected");
                    }
                    trafLayer = !trafLayer;
                  }
                  button = new buttonControl(buttonOptions);
                }}

            defaultZoom={13}
            defaultCenter={{ lat: 50.451057, lng: 30.523353 }}
          >
            {props.markers.map((marker, index) => {
              return <Marker {...marker} />;
            })}

          </GoogleMap>
        }
      />
    </section>
  );
}

SimpleMap.propTypes = {
  markers: React.PropTypes.array.isRequired,
  globalGM: React.PropTypes.object.isRequired
}
