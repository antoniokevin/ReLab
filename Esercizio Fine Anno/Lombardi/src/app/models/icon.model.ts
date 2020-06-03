export class Icon { //abbiamo creato la classe icon, creiamo un oggetto che ci permetta di gestire le dimensioni delle icone che saranno quadrate perche passiamo due volte (size,size)
    public scaledSize:ScaledSize;
    constructor(public url: string, size: number){
        this.scaledSize = new ScaledSize(size,size);
    }

    setSize(size: number) { //tramite set size impostiamo le dimensione delle nostre icone
        this.scaledSize = new ScaledSize(size,size);
    }
}

export class ScaledSize { //nella classe scaledsize passiamo l'altezza e la larghezza
    constructor(
    public width:  number,
    public height: number){}
}
