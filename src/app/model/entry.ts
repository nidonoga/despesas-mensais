export class Entry {

  id?: number;
  name?: string;
  note?: string;
  baseValue?: number;
  payDay?: Date;
  allMonth: boolean;
  type?: string;


  constructor(o: Entry = {} as Entry) {
    let{id = undefined , name = undefined, note = undefined, baseValue = undefined, payDay = undefined, allMonth = false, type = undefined} = o;
    this.id = id;
    this.name = name;
    this.note = note;
    this.baseValue = baseValue;
    this.payDay = payDay;
    this.allMonth = allMonth;
    this.type = type;
  }


  /*
  constructor(id: number, name: string, note: string, baseValue: number, payDay: Date, allMonth: boolean, type: string) {
    this.id = id;
    this.name = name;
    this.note = note;
    this.baseValue = baseValue;
    this.payDay = payDay;
    this.allMonth = allMonth;
    this.type = type;
  }
  */

}
