
import { ActivatedRoute, Router } from '@angular/router';
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
  total! : number;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.movements = this.loadMovements();
    if(this.movements == null){
      this.movements = this.createMovements();
    }

    this.total = this.calculateTotal(this.movements);
  }

  calculateTotal(movements: Movement[]) {
    let totalTmp = 0;
    movements.forEach(movement => {
      totalTmp += movement.value;
    });

    return totalTmp;
  }

  createMovements() {
    let movementsTmp: Movement[] = [];
    movementsTmp.push(new Movement(1, 1,2022,"Pagamento", 3000.00, "Salario liquido do mês"));
    movementsTmp.push(new Movement(2, 1,2022,"Internet", -200.00, "Despesa fixa paga todo mês"));
    movementsTmp.push(new Movement(3, 1,2022,"Telefone", -100.00, "Despesa fixa paga todo mês"));
    movementsTmp.push(new Movement(4, 1,2022,"Lúz", -150.00, "Despesa variável paga todo mês"));
    movementsTmp.push(new Movement(5, 1,2022,"Água", -80.00, "Despesa variável paga todo mês"));

    let json = JSON.stringify(movementsTmp);
    localStorage['movements'] = json;

    return movementsTmp;
  }
  loadMovements() {
    let jsonTmp = localStorage.getItem('movements');
    if(jsonTmp != null)
      return JSON.parse(jsonTmp);

    return null;
  }

}
