import IProduct from "../types/product";
import * as uuid from 'uuid';

export class VendingMachine {
    private _coffe: IProduct;
    private _extras: IProduct[];
    private _combinations: IProduct[][] = [];
    private _products: IProduct[] = [];
    private _cash: string = '0';

    constructor() {
      this.build()
    }

    private build() {
      this._coffe = { id: '1', name: "Coffe", price: 3 };
      this._extras = [{ id: '2', name: "Milk", price: 1.3 }, { id: '3', name: "Cocoa", price: 1.5 },
      { id: '4', name: "Chocolate", price: 1.7 }, { id: '5', name: "Rum", price: 2 }];

      // Get size about possible combinations.
      const combinationsSize = Math.pow(this._extras.length, 2);
      for (let p = 0; p < combinationsSize; p++) {
        this._combinations.push([]);        
      }

      // Check if the combination was added.
      const exists = (combination: IProduct[]) => {
        let exists = false;
        this._combinations.forEach(c => {
          if (JSON.stringify(combination)===JSON.stringify(c)) {
            exists = true;
          }
        });
        return exists;
      }

      // Shake extras to get different possitions to create and check new combinations.
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

          //Every combination starts with a coffe
          combination.push(this._coffe);
  
          if(!exists(combination)) {
            this._combinations[i] = combination;
            continue;
          }
  
          // Iterate extras to get combinations to check & add
          for (let j = 0; j < extras.length; j++) {
            const extra = extras[j];
            combination.push(extra);
            if(!exists(combination)) {
              this._combinations[i] = combination;
              break;
            } else {
              if(j === extras.length-1) {
                // If already exists the algorithm iterate over this combination to remove elements and check that new combination
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

        const actualSize = this._combinations.filter(x => x.length > 0).length;

        //If the matrix wasn't complete it will create new combinations recursivelly
        if(this._combinations.filter(x => x.length === 0).length > 0) {
          createCombinations(actualSize);
        }
      }

      createCombinations(0);

      // Parse combinations to crete new product like { name: 'Coffe, Milk, Cocoa', price: '5.8‬'}
      this._combinations.forEach((combination: IProduct[]) => {
        let product: IProduct = { id: uuid.v4(), name: "", price: 0 };
        combination.forEach((c: IProduct) => {
          product.name += `${c.name}, `;
          product.price += c.price;
        });
        product.name = product.name.trim().slice(0, -1);
        this._products.push(product);
      });

      this._products.sort(function(a, b) {
        return a.price - b.price;
      });
    }

    get products() {
      return this._products;
    }

    get extras() {
      return this._extras;
    }

    get cash() {
      return this._cash;
    }

    set cash(value: string) {
      this._cash = value;
    }
}