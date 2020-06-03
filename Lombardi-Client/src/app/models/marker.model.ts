import { Icon } from './icon.model';

export class Marker {
    icon = {}
    constructor(public lat: number, public lng: number, public label?: string)
    {
        if (this.label.includes("Gas")) {
            this.icon = new Icon ('./assets/immagini/battery-17-16.ico', 24 );
            this.label = "";
            return;
        }
        if(this.label.includes("elettrica"))
        {
          this.icon = new Icon ('./assets/immagini/hex-burner-16.ico', 24 );
          this.label = "";
          return; 
        }
    }
}
