import { Constants } from './../util/constants';
import { Entry } from './../model/entry';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  entry!: Entry;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.entry = new Entry();
    M.textareaAutoResize($('#textarea-note'));
  }

  onSubmit() {
    let entryes = this.loadEntryes();
    let newEntry = new Entry({id:( entryes.length + 1), name: this.entry.name, note: this.entry.note, baseValue: this.entry.baseValue, payDay: this.entry.payDay, allMonth: this.entry.allMonth, type: this.entry.type});
    entryes.push(newEntry);

    let json = JSON.stringify(entryes);
    localStorage[Constants.ENTRY_LIST_NAME] = json;
    /*
    alert(this.entry.name + " - " + this.entry.note + " - " + this.entry.baseValue + " - " + this.entry.payDay + " - " + this.entry.allMonth + " - " + this.entry.type);
    */

    this.router.navigate(['/entry-list'])

  }


  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  loadEntryes():Entry[] {
    let jsonTmp = localStorage.getItem(Constants.ENTRY_LIST_NAME);
    if(jsonTmp != null)
      return JSON.parse(jsonTmp);

    return <Entry[]>[];
  }

  retryAllMonth(allMonthField: boolean):boolean {
    if(allMonthField === undefined){
      return false;
    }

    return allMonthField;
  }

}
