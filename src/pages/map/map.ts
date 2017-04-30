import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from "../../providers/auth-service";
import * as Leaflet from "leaflet";

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    locations: FirebaseListObservable<any[]>;
    currentLocation: FirebaseObjectObservable<any>;

    _latLng: Leaflet.LatLng;
    marker: Leaflet.Marker;
    circle: Leaflet.Circle;
    map: Leaflet.Map;
    private radius: number;

    ngOnInit(): void {
        this.map = Leaflet
            .map("map")
            .setView(this.latLng, 13)
            .on("click", this.onMapClicked.bind(this))

        var photoIcon = L.icon({
            iconUrl: this._auth.displayPhoto(),
            shadowUrl: null,

            iconSize: [32, 32], // size of the icon
            iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
            popupAnchor: [8, 16] // point from which the popup should open relative to the iconAnchor
        });

        this.marker = Leaflet
            .marker(this.latLng, { icon: photoIcon, draggable: false })
            .on("dragend", this.onMarkerPositionChanged.bind(this))
            .addTo(this.map);

        this.circle = Leaflet.circle(this.latLng, this.radius).addTo(this.map);
    }

    onMapClicked(e) {
        this._latLng = e.latlng;
    }

    onMarkerPositionChanged(e) {
        const latlng = e.target.getLatLng();
        this._latLng = latlng;
    }

    constructor(
        private af: AngularFire,
        public navCtrl: NavController,
        public navParams: NavParams,
        private _auth: AuthService,
        private geolocation: Geolocation
    ) {
        this.locations = this.af.database.list("/map");
        var currentLocation = this.af.database.object("/map/" + this._auth.uid());
        if(this._latLng == null)
            this._latLng = new Leaflet.LatLng(0,0);

        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
            console.log("update position", data);
            currentLocation.set({
                coords: {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                },
                timestamp: Math.floor(Date.now() / 1000)
            });
            this.radius = data.coords.accuracy;
            this._latLng.lat = data.coords.latitude;
            this._latLng.lng = data.coords.longitude;
        });
    }

    get latLng() {
        return this._latLng;
    }

    

}
