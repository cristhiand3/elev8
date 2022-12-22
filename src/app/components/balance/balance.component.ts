import { UsersService } from 'src/app/services/users.service';
import { GastoService } from './../../services/gasto.service';
import { Gasto } from './../../models/gasto';
import { PresupuestoService } from './../../services/presupuesto.service';
import { Presupuesto } from './../../models/presupuesto';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import {formatNumber} from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit{
  locale:string;
  gastoList : Gasto[] = [];
  presupuestoList: Presupuesto[] = [];
  total : number = 0;

  constructor(@Inject(LOCALE_ID) locale: string, private pService: PresupuestoService, private gService: GastoService, private userService: UsersService,) {
    this.locale=locale;
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

  pad(num:number, size:number): string {
    // | number:'1.2-2'
    let s = formatNumber(num,this.locale, '1.2-2');
    //let s = num+"";
    while (s.length < size) s = " " + s;
    return s;
  }

  public downloadPDF(): void {
    let DATA: any = document.getElementById('balance');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 10;
      let username = this.userService.get_user()?.displayName || 'Invitado';
      PDF.text('Balance de gastos de '+username +':', position, 10);
      PDF.addImage(FILEURI, 'PNG', 0, position+5, fileWidth+10, fileHeight);
      PDF.save('balance.pdf');
    });

  }

}
