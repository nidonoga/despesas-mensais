import { Component, OnInit } from '@angular/core';

import { Movement } from './../model/movement';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  testeTwoWayDataBindingInput = '';
  movements : Movement[] = [];
  total : number;


  constructor() {
    this.movements.push(new Movement(1, 1,2022,"Pagamento", 3000.00));
    this.movements.push(new Movement(2, 1,2022,"Internet", -200.00));
    this.movements.push(new Movement(3, 1,2022,"Telefone", -100.00));
    this.movements.push(new Movement(3, 1,2022,"Lúz", -150.00));
    this.movements.push(new Movement(3, 1,2022,"Água", -80.00));
    this.total = 2470;
  }

  ngOnInit(): void {
  }

}
