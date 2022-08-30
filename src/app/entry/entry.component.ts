import { EntryService } from './../entry.service';
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

  constructor(private router: Router, private entryService: EntryService) { }

  ngOnInit(): void {
    this.entry = new Entry();
  }

  onSubmit() {
    /*
    // SAVE COM OBSERVABLE
    this.entryService.saveOrUpdate(this.entry).subscribe({
      complete: () => this.router.navigate(['/entry-list']),
      error: () => alert('Houve um erro!')
    });
    */

    this.entryService.saveComPromise(this.entry)
      .then( savedEntry => {
        this.router.navigate(['/entry-list']);
      })
      .catch((e) => {
        alert('Houve um erro: ' + e);
      })

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
