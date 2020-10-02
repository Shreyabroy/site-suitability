import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latitude = 18.5204;
  longitude = 73.8567;
  zoomLevel = 10;
  coordGPSSystem: any = 'EPSG:4326';
  coordOSMSystem: any = 'EPSG:3857';
  tiles: any ;
  baseurl: any;
  markers: any;
  bounds: any;
  polygon: any;
  polyline: any;
  svgLayer: any;
  rectangulerLayer: any;
  circleLayer: any[] = [];
  circle: any;

  constructor(private http: HttpClient) {
    this.baseurl = 'http://localhost:8080/geoserver/PROJECT/wms'; // geoserver_map
    console.log('--------------this.baseurl:' + this.baseurl);
   }

  // Loading based and all additional layers
  ngOnInit() {
    this.initMap(this.latitude, this.longitude, this.zoomLevel);
  }

  private initMap(latitude: number, longitude: number, zoomLevel: number) {

    const map = L.map('map').setView([latitude, longitude], zoomLevel);
   // TileLayer
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(map);
    const wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    // wMaps.addTo(map);

    // TileLayer.WMS
    const pune = L.tileLayer.wms(this.baseurl, {
      layers: 'Pune',
      format: 'image/png',
      transparent: true,
      attribution: 'GRAY_INDEX'
    });
    const sitesuitability = L.tileLayer.wms(this.baseurl, {
      layers: 'Site Suitability',
      format: 'image/png',
      transparent: true,
      attribution: 'PALETTE_INDEX'
    });
    const lulc = L.tileLayer.wms(this.baseurl, {
      layers: 'Land Use-Land Cover',
      format: 'image/png',
      transparent: true,
      attribution: 'GRAY_INDEX'
    });
    const dem = L.tileLayer.wms(this.baseurl, {
      layers: 'DEM',
      format: 'image/png',
      transparent: true,
      attribution: 'GRAY_INDEX'
    });
    const aspect = L.tileLayer.wms(this.baseurl, {
      layers: 'Aspect',
      format: 'image/png',
      transparent: true,
      attribution: 'GRAY_INDEX'
    });
    const slope = L.tileLayer.wms(this.baseurl, {
      layers: 'Slope',
      format: 'image/png',
      transparent: true,
      attribution: 'GRAY_INDEX'
    });
    const geology = L.tileLayer.wms(this.baseurl, {
      layers: 'Geology',
      format: 'image/png',
      transparent: true,
      attribution: 'GRAY_INDEX'
    });
    const ndvi = L.tileLayer.wms(this.baseurl, {
      layers: 'ndvi',
      format: 'image/png',
      transparent: true,
      attribution: 'GRAY_INDEX'
    });
    const puneRoad = L.tileLayer.wms(this.baseurl, {
  layers: 'Euclidian Road',
  format: 'image/png',
  transparent: true,
  attribution: 'GRAY_INDEX'
});
    const puneWater = L.tileLayer.wms(this.baseurl, {
  layers: 'Euclidian Water',
  format: 'image/png',
  transparent: true,
  attribution: 'GRAY_INDEX'
    });

    // All based layers
    const baseMaps = {
  'OSM Street': tiles,
  'OSM Grayscale': wMaps
};

// All overlay layers
    const overlays = {
  'Pune Boundary': pune,
  'Site Suitability': sitesuitability,
  'Land Use/Land cover' : lulc,
  ' Elevation' : dem,
  ' Aspect' : aspect,
  ' Slope' : slope,
  ' Geology' : geology,
  'Normalized Difference Vegetation Index' : ndvi,
  'Euclidian Roads': puneRoad,
  'Euclidian Water Bodies': puneWater
};

    L.control.layers(
  baseMaps,
  overlays,
  {position: 'topright'}).addTo(map);
// Map Scalling
    L.control.scale().addTo(map);







  }
}
