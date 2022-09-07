import { getTestBed } from '@angular/core/testing';
import { MovementService } from './../movement.service';
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

  constructor(private route: ActivatedRoute, private movementService: MovementService) { }

  ngOnInit(): void {

    let idParam = this.route.snapshot.params['id'];

    this.movementService.getById(idParam).subscribe(
      (mov) => {
        this.movimento = mov;
      }
    );

  }
}
