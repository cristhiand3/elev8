import { Categoria } from './../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{

  formCategoria !: FormGroup;
  categoria : Categoria = {'nombre': ""};
  categoriaList : Categoria[] = [];

  constructor(private service: CategoriaService) {
    this.formCategoria = new FormGroup({
      nombre: new FormControl(),
      id: new FormControl(),
      categoria: new FormControl(),
      valor: new FormControl()
    });
  }

  ngOnInit(): void {
    this.categoria.nombre = "";
    this.list();

  }

  list() {
    this.service.getList().subscribe((data) => {
      this.categoriaList = data as Categoria[]
     })
  }

  guardar() {
    let categoria = this.formCategoria.value;
    if(categoria.id == null) {
      this.service.create(categoria).then(() => {
        this.list()
        this.formCategoria.reset()
        alert("Creado Exitosamente")
      })
    } else {
      this.service.update(categoria).then(() => {
        this.list()
        this.formCategoria.reset()
        alert("Actualizado Exitosamente")
      })
    }
  }

  editar(categoria: Categoria) {
    this.formCategoria.get('id')?.setValue(categoria.id);
    this.formCategoria.get('nombre')?.setValue(categoria.nombre);
  }

  borrar(categoria: Categoria) {
    this.service.delete(categoria).then(() => {
      this.list()
    })
  }

}
