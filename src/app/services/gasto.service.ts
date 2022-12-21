import { Gasto } from './../models/gasto';
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private firestore: Firestore) { }

  create(gasto: Gasto) {
    const docRef = collection(this.firestore, 'gasto')
    return addDoc(docRef, gasto)
  }

  getList() {
    const docRef = collection(this.firestore, 'gasto')
    return collectionData(docRef, {idField: 'id'})
  }

  get(id: string) {
    const docRef = doc(this.firestore, 'gasto', id)
    return getDoc(docRef)
  }

  update(gasto: Gasto) {
    const docRef = doc(this.firestore, `gasto/${gasto.id}`);
    return setDoc(docRef, {...gasto});
  }

  delete(gasto: Gasto) {
    const docRef = doc(this.firestore, `gasto/${gasto.id}`);
    return deleteDoc(docRef);
  }
}
