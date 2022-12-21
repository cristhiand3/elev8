import { PresupuestoService } from './../../services/presupuesto.service';
import { Presupuesto } from './../../models/presupuesto';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit{
  formPresupuesto !: FormGroup;
  presupuesto !: Presupuesto;

  constructor(private service: PresupuestoService) {
    this.formPresupuesto = new FormGroup({
      monto: new FormControl()
    });
  }

  ngOnInit() : void {
    this.service.get('1').then((data) => {
      this.presupuesto = data.data() as Presupuesto;
      this.presupuesto.id = '1';
      if(this.presupuesto.monto == undefined) this.presupuesto.monto = 0
    })
  }

  guardar() {
    console.log(this.presupuesto);
    this.service.update(this.presupuesto).then(() => {
      alert("actualizado");
    })
  }
}
