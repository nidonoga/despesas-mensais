import { EntryService } from './../entry.service';
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

  entries: Entry[] = [];

  constructor(private router: Router, private entryService: EntryService) { }

  ngOnInit(): void {

    let entriesTmp = this.loadEntries();
    if(entriesTmp != null) {
      this.entries = entriesTmp;
    }

  }

  loadEntries() {

    this.entryService.listEntry().subscribe(
      (entries) => {
        this.entries = entries;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteEntry(id :number) {
    this.entryService.delete(id).subscribe({
      complete: () => this.loadEntries()
    });

  }

}
