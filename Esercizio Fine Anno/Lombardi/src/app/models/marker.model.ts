import { Icon } from './icon.model';

export class Marker {
    icon = {}
   //Quando creo un nuovo marker e verifico quale label viene passata al costruttore, se contiene il testo
   //“Gas naturale” o “Energia elettrica” (abbreviati in Gas e Elettrica) imposto l’icona e cancello
   //l’etichetta
    constructor(public lat: number, public lng: number, public label?: string)
    {
        if (this.label.includes("Gas")) {
            this.icon = new Icon ( './assets/img/gas.ico', 24 );
             this.label = "";
        }
        if(this.label.includes("elettrica"))
        {
            this.icon = new Icon ( './assets/img/electricity.ico', 24 ) ;
             this.label = "";
        }
        if(this.label.includes("Gasolio"))
        {
            this.icon = new Icon ( './assets/img/oil.ico', 24 ) ;
             this.label = "";
        }
        if(this.label.includes("Teleriscaldamento"))
        {
            this.icon = new Icon ( './assets/img/teleriscaldamento.ico', 24 ) ;
             this.label = "";
        }
        if(this.label.includes("GPL"))
        {
            this.icon = new Icon ( './assets/img/lpg.ico', 24 ) ;
             this.label = "";
        }
        if(this.label.includes("NULL"))
        {
            this.icon = new Icon ( './assets/img/question.ico', 24 ) ;
             this.label = "";
        }
        if(this.label.includes("Biomasse solide"))
        {
            this.icon = new Icon ( './assets/img/biomass.ico', 24 ) ;
             this.label = "";
        }
        if(this.label.includes("RSU"))
        {
            this.icon = new Icon ( './assets/img/rsu.ico', 24 ) ;
             this.label = "";
        }
        if(this.label.includes("Biomasse liquide"))
        {
            this.icon = new Icon ( './assets/img/biomass2.ico', 24 ) ;
             this.label = "";
        }
        if(this.label.includes("Olio combustibile"))
        {
            this.icon = new Icon ( './assets/img/combOil.ico', 24 ) ;
             this.label = "";
        }
    }
}
