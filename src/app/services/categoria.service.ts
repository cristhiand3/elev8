import { Categoria } from './../models/categoria';
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private firestore: Firestore) { }

  create(categoria: Categoria) {
    const docRef = collection(this.firestore, 'categoria')
    return addDoc(docRef, categoria)
  }

  getList() {
    const docRef = collection(this.firestore, 'categoria')
    return collectionData(docRef, {idField: 'id'})
  }

  get(id: string) {
    const docRef = doc(this.firestore, 'categoria', id)
    return getDoc(docRef)
  }

  update(categoria: Categoria) {
    const docRef = doc(this.firestore, `categoria/${categoria.id}`);
    return setDoc(docRef, {...categoria});
  }

  delete(categoria: Categoria) {
    const docRef = doc(this.firestore, `categoria/${categoria.id}`);
    return deleteDoc(docRef);
  }
}
