import { Constants } from './../util/constants';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Movement } from './../model/movement';
import { Entry } from '../model/entry';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  testeTwoWayDataBindingInput = '';
  movements : Movement[] = [];
  total! : number;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    let movementsTmp = this.loadMovements();
    if(movementsTmp != null){
      this.movements = movementsTmp;
    }


    this.total = this.calculateTotal(this.movements);
  }

  calculateTotal(movements: Movement[]) {
    let totalTmp = 0;
    movements.forEach(movement => {
      if(movement.value != null) {
        totalTmp += movement.value;
      }
    });

    return totalTmp;
  }

  createMovements() {
    let movementsTmp: Movement[] = [];

    movementsTmp.push(new Movement({id: 1, month: 1, year: 2022, value: 3000.00, entry: new Entry({id: 1, name: "Pagamento", note: "Salario liquido do mês", baseValue: 3000.00, payDay: new Date("2019-01-16"), allMonth: true, type: "entrada"})}));
    movementsTmp.push(new Movement({id: 2, month: 1, year: 2022, value: -200.00, entry: new Entry({id: 2, name: "Internet", note: "Despesa fixa paga todo mês", baseValue: -200.00, payDay: new Date("2019-01-16"), allMonth: true, type: "entrada"})}));
    movementsTmp.push(new Movement({id: 3, month: 1, year: 2022, value: -100.00, entry: new Entry({id: 3, name: "Telefone", note: "Despesa fixa paga todo mês", baseValue: -100.00, payDay: new Date("2019-01-16"), allMonth: true, type: "entrada"})}));
    movementsTmp.push(new Movement({id: 4, month: 1, year: 2022, value: -150.00, entry: new Entry({id: 4, name: "Lúz", note: "Despesa variável paga todo mês", baseValue: -150.00, payDay: new Date("2019-01-16"), allMonth: true, type: "entrada"})}));
    movementsTmp.push(new Movement({id: 5, month: 1, year: 2022, value: -80.00, entry: new Entry({id: 5, name: "Água", note: "Despesa variável paga todo mês", baseValue: -80.00, payDay: new Date("2019-01-16"), allMonth: true, type: "entrada"})}));

    let json = JSON.stringify(movementsTmp);
    localStorage[Constants.MOVIMENT_LIST_NAME] = json;

    return movementsTmp;
  }

  loadMovements() {
    let jsonTmp = localStorage.getItem('movements');
    if(jsonTmp != null)
      return JSON.parse(jsonTmp);

    return null;
  }

  gerarMovimentos() {

  }

}
