import { GastoService } from './../../services/gasto.service';
import { Gasto } from './../../models/gasto';
import { PresupuestoService } from './../../services/presupuesto.service';
import { Presupuesto } from './../../models/presupuesto';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit{
  gastoList : Gasto[] = [];
  presupuestoList: Presupuesto[] = [];
  total : number = 0;

  constructor(private pService: PresupuestoService, private gService: GastoService) {
  }

  ngOnInit() : void {
    this.gService.getList().subscribe((data) => {
      this.gastoList = data as Gasto[]
      this.calculo()
    })
    this.pService.getList().subscribe((data) => {
      this.presupuestoList = data as Presupuesto[]
      this.calculo()
    })
  }

  calculo() {
    this.total = 0
    for(let i of this.gastoList) {
      this.total -= i.valor;
    }
    for(let i of this.presupuestoList) {
      this.total += i.monto;
    }
  }

}
