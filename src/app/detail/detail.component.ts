import { Movement } from './../model/movement';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  movimento!: Movement;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    let idParam = this.route.snapshot.params['id'];

    // this.movimento = new Movement(idParam, 12, 2022, "teste", 1200, "testes");
    this.movimento = this.loadMovement(idParam);

  }

  loadMovement(idParam: number) {
    let jsonTmp = localStorage.getItem('movements');
    let movementTmp = new Movement(0,0,0,"",0,"");
    if(jsonTmp != null) {
      var locations: Array<Movement> = JSON.parse(jsonTmp);
      locations.forEach(element => {
        if(element.id != null &&  element.id == idParam) {
          movementTmp = element;
        }
      });
    }

    return movementTmp;
  }

}
