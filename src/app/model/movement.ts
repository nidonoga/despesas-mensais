export class Movement {

  constructor(public id: number, public month: number, public year: number, public name: string, public value: number, public note: string) {
    this.id = id;
    this.month = month;
    this.year = year;
    this.name = name;
    this.value = value;
    this.note = note;
  }

}
