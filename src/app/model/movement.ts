import { Entry } from './entry';
export class Movement {

  id?: number;
  month?: number;
  year?: number;
  value?: number;
  entry?: Entry;

  constructor(o: Movement = {} as Movement) {

    let{id = undefined , month = undefined, year = undefined, value = undefined, entry = undefined} = o;

    this.id = id;
    this.month = month;
    this.year = year;
    this.value = value;
    this.entry = entry;
  }

}
