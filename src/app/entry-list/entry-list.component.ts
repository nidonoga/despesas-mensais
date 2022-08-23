import { Constants } from './../util/constants';
import { Entry } from './../model/entry';
import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entryes: Entry[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    let entryesTmp = this.loadEntryes();
    if(entryesTmp != null) {
      this.entryes = entryesTmp;
    }

  }

  loadEntryes() {
    let jsonTmp = localStorage.getItem(Constants.ENTRY_LIST_NAME);
    if(jsonTmp != null)
      return JSON.parse(jsonTmp);

    return null;
  }

}
