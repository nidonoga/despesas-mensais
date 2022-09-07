import { forkJoin, Observable } from 'rxjs';
import { MovementService } from './../movement.service';
import { EntryService } from './../entry.service';
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
  month! : number;
  year! : number;

  constructor(private router: Router, private entryService: EntryService, private movementService: MovementService) {

  }

  ngOnInit(): void {
    this.loadMovements();
    this.recuperarMesAno();
    this.inicializarCombosSelect();
  }

  calculateTotal() {
    let totalTmp = 0;
    this.movements.forEach(movement => {
      if(movement.value != null) {
        if(movement.type === 'ENTRADA'){
          totalTmp += movement.value;
        } else {
          totalTmp -= movement.value;
        }
      }
    });
    this.total = totalTmp;
  }

  loadMovements() {
    this.movements = [];
    this.movementService.listMoviment().subscribe(
      (movements) => {
        movements.forEach(mov => {
          if(this.movementInTheSameMonthAndYear(mov.month!, mov.year!)) {
            this.movements.push(mov);
          }
        });

        this.calculateTotal();

      },
      (error) => {
        console.log(error);
      }
    );
  }


  recuperarMesAno() {
    this.month = (new Date().getMonth() + 1);
    this.year = new Date().getFullYear();
  }

  ngAfterViewInit() {

  }

  inicializarCombosSelect() {
    var elems = document.querySelectorAll('select');
    elems.forEach(sel => {
      if(sel.name === 'select-month') {
        sel.selectedIndex = this.month;
      }

    });
    M.FormSelect.init(elems, {});
  }

  generateMonthlyMovements() {

    this.movementService.listMoviment().subscribe(
      (movements => {

        if(this.haveMovementInTheSameMonthAndYear(movements)) {
          this.loadMovements();
        } else {
          this.entryService.listEntry().subscribe(
            (entries) => {
              if(entries.length == 0) {
                alert('Não encontrados lançamentos cadastrados.');

              } else {
                this.generateMovementByEntry(entries);
              }

            },
            (error) => {
              console.log(error);
            }

          );

        }
      }));
  }

  createMovement(entry :Entry): Movement {
    let movement :Movement = new Movement();
    movement.month = this.month;
    movement.year = this.year;
    movement.value = entry.baseValue;
    movement.name = entry.name;
    movement.entryId = entry.id;
    movement.type = entry.type;
    return movement;
  }



  loadEntries(): Entry[] {
    let entries: Entry[] = [];
    this.entryService.listEntry().subscribe(
      (entr) => {
        entries = entr;
      }
    );
    return entries;
  }


  instanciarData(data: Date): Date {
    if(data !== undefined) {
      return new Date(data);
    }


    return new Date()
  }

  generateMovementByEntry(entries: Entry[]) {
    let tmp = [];
    for (let index = 0; index < entries.length; index++) {
      console.log(entries[index]);
      if(entries[index].allMonth || this.entryInTheSameMonth(entries[index].payDay)) {
        tmp.push(this.movementService.saveOrUpdate(this.createMovement(entries[index])));
      }
    }

    forkJoin(tmp).subscribe({
      complete: () => this.loadMovements()
    });

  }

  entryInTheSameMonth(payDayEntry: Date | undefined): boolean {

    if(payDayEntry === undefined) {
      return false
    }


    let sameMonth :boolean = false;
    let sameYear :boolean = false;

    const [year, month, day] = payDayEntry.toString().split('-');
    const payDay = new Date(+year, +month - 1, +day);

    let payDayMonth = payDay.getMonth() + 1;
    let payDayYear = payDay.getFullYear();

    if(payDayMonth == this.month){
      sameMonth = true;
    }

    if(payDayYear === this.year){
      sameYear = true;
    }

    return sameMonth && sameYear;
  }


  deleteMonthlyMovements() {
    this.movementService.listMoviment().subscribe(
      (movements) => {
        this.deleteMovementOfPeriod(movements);
      }
    )

  }

  deleteMovementOfPeriod(movements :Movement[]) {
    let arrayObservableDelete = [];
    for (let index = 0; index < movements.length; index++) {
      if(this.movementInTheSameMonthAndYear(movements[index].month!, movements[index].year!)) {
        arrayObservableDelete.push(this.movementService.delete(movements[index].id!));
      }
    }

    forkJoin(arrayObservableDelete).subscribe({
      complete: () => this.loadMovements()
    });

  }

  movementInTheSameMonthAndYear(movMonth :number, movYear :number) :boolean {

    let sameMonth :boolean = false;
    let sameYear :boolean = false;

    if(movMonth == this.month) {
      sameMonth = true;
    }

    if(movYear === this.year) {
      sameYear = true;
    }

    return sameMonth && sameYear;
  }

  loadMovementsByMonthAndYear() {
    this.movements = [];
    this.movementService.listMoviment().subscribe(
      (movements) => {
        if(movements.length === 0){
          alert('Não encontrados movimentos para o período informado');
        } else {

          movements.forEach(mov => {
            if(this.movementInTheSameMonthAndYear(mov.month!, mov.year!)) {
              this.movements.push(mov);
            }
          });
          this.calculateTotal();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  haveMovementInTheSameMonthAndYear(movements :Movement[]):boolean {
    let haveMovementInTheSameMontAndYear = false;
    movements.forEach(mov => {
      if(this.movementInTheSameMonthAndYear(mov.month!, mov.year!)){
        haveMovementInTheSameMontAndYear = true;
      }

    });

    return haveMovementInTheSameMontAndYear;
  }

}
