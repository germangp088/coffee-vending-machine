import IProduct from "../types/product";

export class VendingMachine {
    private _coffe: IProduct;
    private _extras: IProduct[];
    private _combinations: IProduct[][] = [];

    constructor() {
      this.build()
    }

    private build() {
      this._coffe = { name: "Coffe", price: 3 };
      this._extras = [{ name: "Milk", price: 1.3 }, { name: "Cocoa", price: 1.5 },
      { name: "Chocolate", price: 1.7 }, { name: "Rum", price: 2 }];

      const combinationsSize = Math.pow(this._extras.length, 2);
      for (let p = 0; p < combinationsSize; p++) {
        this._combinations.push([]);        
      }

      const exists = (combination: IProduct[]) => {
        let exists = false;
        this._combinations.forEach(c => {
          if (JSON.stringify(combination)===JSON.stringify(c)) {
            exists = true;
          }
        });
        return exists;
      }

      const shake = () => {
        const extras = JSON.parse(JSON.stringify(this._extras));

        const getRandomInt = () => {
          return Math.floor(Math.random() * extras.length);
        }

        for (let e = 0; e < combinationsSize; e++) {
          const rndI = getRandomInt();
          const rndJ = getRandomInt();
          const obj = extras[rndI];
          extras[rndI] = extras[rndJ];
          extras[rndJ] = obj;
        }

        return extras;
      }

      const createCombinations = (init: number) => {
        const extras = shake();
        for (let i = init; i < combinationsSize; i++) {
          const combination: IProduct[] = []
          combination.push(this._coffe);
  
          if(!exists(combination)) {
            this._combinations[i] = combination;
            continue;
          }
  
          for (let j = 0; j < extras.length; j++) {
            const extra = extras[j];
            combination.push(extra);
            if(!exists(combination)) {
              this._combinations[i] = combination;
              break;
            } else {
              if(j === extras.length-1) {
                for (let c = 1; c < combination.length; c++) {
                  combination.splice(c, 1);
                  if(!exists(combination)) {
                    this._combinations[i] = combination;
                    break;
                  }
                }
              }
              continue;
            }
          }
        }
        const actualSize = this._combinations.filter(x => x.length > 0).length
        if(this._combinations.filter(x => x.length === 0).length > 0){
          createCombinations(actualSize);
        }
      }
      createCombinations(0);
    }

    get combinations() {
      return this._combinations;
    }
}