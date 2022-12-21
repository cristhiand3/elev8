import { Categoria } from './../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { Gasto } from './../../models/gasto';
import { GastoService } from './../../services/gasto.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent implements OnInit{

  formGasto !: FormGroup;
  gasto : Gasto = {'nombre': "", 'categoria':{'nombre':""}, 'valor':0};
  gastoList : Gasto[] = [];
  categoriaList: Categoria[] = [];

  constructor(private service: GastoService, private catService: CategoriaService) {
    this.formGasto = new FormGroup({
      nombre: new FormControl(),
      id: new FormControl(),
      categoria: new FormControl(),
      valor: new FormControl()
    });
  }

  ngOnInit(): void {
    this.gasto.nombre = "";
    this.list();
    this.catService.getList().subscribe((data) => {
      this.categoriaList = data as Categoria[];
    })
  }

  list() {
    this.service.getList().subscribe((data) => {
      this.gastoList = data as Gasto[];
     })
  }

  guardar() {
    let gasto = this.formGasto.value;
    console.log(gasto)
    if(gasto.id == null) {
      this.service.create(gasto).then(() => {
        this.list()
        this.formGasto.reset()
        alert("Creado Exitosamente")
      })
    } else {
      this.service.update(gasto).then(() => {
        this.list()
        this.formGasto.reset()
        alert("Actualizado Exitosamente")
      })
    }
  }

  editar(gasto: Gasto) {
    this.formGasto.get('id')?.setValue(gasto.id);
    this.formGasto.get('nombre')?.setValue(gasto.nombre);
    this.formGasto.get('categoria')?.setValue(gasto.categoria);
    this.formGasto.get('valor')?.setValue(gasto.valor);
  }

  borrar(gasto: Gasto) {
    this.service.delete(gasto).then(() => {
      this.list()
    })
  }

}
