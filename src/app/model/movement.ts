import { Entry } from './entry';
export class Movement {

  id?: number;
  month?: number;
  year?: number;
  value?: number;
  name?: string
  entryId?: number;
  type?: string;

  constructor(o: Movement = {} as Movement) {

    let{id = undefined , month = undefined, year = undefined, value = undefined, name = undefined, entryId = undefined, type = undefined} = o;

    this.id = id;
    this.month = month;
    this.year = year;
    this.value = value;
    this.name = name;
    this.type = type;
  }

}
