import {initMap, loadScript} from './utils/gmap.js';

loadScript(
  'https://maps.googleapis.com/maps/api/js?v=3&libraries=visualization,drawing,geometry,places&key=AIzaSyA56R0C2n_rs_oJajhK1s_iGffr3zPjjo8&language=vn',
  initMap
);