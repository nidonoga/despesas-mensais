export class Movement {

  constructor(public sequence: number, public month: number, public year: number, public name: string, public value: number) {
    this.sequence = sequence;
    this.month = month;
    this.year = year;
    this.name = name;
    this.value = value;
  }

}
