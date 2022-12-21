import { Presupuesto } from './../models/presupuesto';
import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  constructor(private firestore: Firestore) { }

  get(id: string) {
    const docRef = doc(this.firestore, 'presupuesto', id);
    return getDoc(docRef);
  }

  getList() {
    const docRef = collection(this.firestore, 'presupuesto')
    return collectionData(docRef, {idField: 'id'})
  }

  update(presupuesto: Presupuesto) {
    const docRef = doc(this.firestore, `presupuesto/${presupuesto.id}`);
    return setDoc(docRef, {...presupuesto});
  }
}
