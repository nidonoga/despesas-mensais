import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-panel',
  templateUrl: './total-panel.component.html',
  styleUrls: ['./total-panel.component.css']
})
export class TotalPanelComponent implements OnInit {
  @Input() total: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
