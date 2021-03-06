import { Component, OnInit } from '@angular/core';
import { GeoFeatureCollection } from './models/geojson.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marker } from './models/marker.model';
import { Ci_vettore } from './models/ci_vett.model';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ang-maps';
  // google maps zoom level
  zoom: number = 12;
  geoJsonObject: GeoFeatureCollection; //Oggetto che conterrà il vettore di GeoJson
  fillColor: string = "#FF0000";  //Colore delle zone catastali
  obsGeoData: Observable<GeoFeatureCollection>;
  lng: number = 9.205331366401035;
  lat: number = 45.45227445505016;
  obsCiVett : Observable<Ci_vettore[]>; //Crea un observable per ricevere i vettori energetici
  markers : Marker[] //Marker va importato
  circleLat : number = 0; //Latitudine e longitudine iniziale del cerchio
  circleLng: number = 0;
  maxRadius: number = 400; //Voglio evitare raggi troppo grossi
  radius : number = this.maxRadius; //Memorizzo il raggio del cerchio
  // qua abbiamo impostati le variabili iniziali come ad esempio longitudine e latitudine e un maxradius che ci permette di evitare ricerche troppo complesse

  constructor(public http: HttpClient) {
  }

  prepareData = (data: GeoFeatureCollection) => {
    this.geoJsonObject = data
    console.log(this.geoJsonObject)
  }

  //Metodo che riceve i dati e li aggiunge ai marker
  prepareCiVettData = (data: Ci_vettore[]) =>
  {
    console.log(data); //Verifica di ricevere i vettori energetici
    this.markers = []; //NB: markers va dichiarata tra le proprietà markers : Marker[]
    for (const iterator of data) { //Per ogni oggetto del vettore creoa un Marker
      let latTot = 0; //Uso queste due variabili per calcolare latitudine e longitudine media
    let lngTot = 0; //E centrare la mappa
    // in questo metodo calcoliamo la longitudine e la latitudine totali e poi facciamo la media in modo che la mappa sia centrata

    console.log(data);
    this.markers = [];

    for (const iterator of data) {
      let m = new Marker(iterator.WGS84_X,iterator.WGS84_Y,iterator.CI_VETTORE);
      latTot += m.lat; //Sommo tutte le latitutidini e longitudini
      lngTot += m.lng;
      this.markers.push(m);
    }
    this.lng = lngTot/data.length; //Si fa la media delle longitudini e latitudini, per stabilire il centro della zona
    this.lat = latTot/data.length;
    this.zoom = 16;
    }
 }

 mapClicked($event: MouseEvent) {
    this.circleLat = $event.coords.lat; //Queste sono le coordinate cliccate
    this.circleLng = $event.coords.lng; //Sposto il centro del cerchio qui
    this.lat = this.circleLat; //Sposto il centro della mappa qui
    this.lng = this.circleLng;
    this.zoom = 15;  //Zoom sul cerchio
    // nel metodo mapclicked invece faccio si che il centro del cerchio che quello della mappa si spostino in base dove clicchiamo
  }

  ngOnInit() {
    this.obsGeoData = this.http.get<GeoFeatureCollection>('https://3000-ef60a25e-a01a-43d1-9d27-449bc71fb565.ws-eu01.gitpod.io/');
    this.obsGeoData.subscribe(this.prepareData);
  }

  circleRedim(newRadius : number){
    console.log(newRadius) //posso leggere sulla console il nuovo raggio
    this.radius = newRadius;  //Ogni volta che modifico il cerchio, ne salvo il raggio
  }

  circleDoubleClicked(circleCenter)
  {
    console.log(circleCenter); //Voglio ottenere solo i valori entro questo cerchio
    console.log(this.radius);
    // serve per gestire la possibilità di effettuare il doppioclick

    this.circleLat = circleCenter.coords.lat; //Aggiorno le coordinate del cerchio
    this.circleLng = circleCenter.coords.lng; //Aggiorno le coordinate del cerchio

    //Non conosco ancora le prestazioni del DB, non voglio fare ricerche troppo onerose
    if(this.radius > this.maxRadius)
    {
      console.log("area selezionata troppo vasta sarà reimpostata a maxRadius");
       this.radius = this.maxRadius;
       // qua troviamo l'if che gestisce il maxradius ovvero non permette che il raggio superi il limite di 400
    }
    console.log ("raggio in gradi " + (this.radius * 0.00001)/1.1132)

    //Voglio spedire al server una richiesta che mi ritorni tutte le abitazioni all'interno del cerchio

    let raggioInGradi = (this.radius * 0.00001)/1.1132;
    //Posso riusare lo stesso observable e lo stesso metodo di gestione del metodo
    //cambiaFoglio poichè riceverò lo stesso tipo di dati
    //Divido l'url andando a capo per questioni di leggibilità non perchè sia necessario
    this.obsCiVett = this.http.get<Ci_vettore[]>(`https://3000-ef60a25e-a01a-43d1-9d27-449bc71fb565.ws-eu01.gitpod.io/ci_geovettore/
    ${this.circleLat}/
    ${this.circleLng}/
    ${raggioInGradi}`);
    this.obsCiVett.subscribe(this.prepareCiVettData);

  }

  //Questo metodo richiama la route sul server che recupera il foglio specificato nella casella di testo
  cambiaFoglio(foglio) : boolean
  {
    let val = foglio.value; // prendo il valore da un componente html, come foglio che è un input tag
    this.obsCiVett = this.http.get<Ci_vettore[]>(`https://3000-ef60a25e-a01a-43d1-9d27-449bc71fb565.ws-eu01.gitpod.io/ci_vettore/${val}`);  // effettuo una richiesta http prendo i dati del foglio scelto dal sito dove è hostato il server
    this.obsCiVett.subscribe(this.prepareCiVettData); //e infine lanciamo il metodo preparecivettdata dopo l'arrivo dei dati
    console.log(val);
    return false;
    //
  }

  styleFunc = (feature) => {
    return ({
      clickable: false,
      fillColor: this.fillColor,
      strokeWeight: 1
    });
  }

}
