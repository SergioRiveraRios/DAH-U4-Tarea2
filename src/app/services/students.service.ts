import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Estudiante } from 'src/app/models/estudiante'
@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private firestore: AngularFirestore) { }
  createStudent(student: Estudiante) {
    return this.firestore.collection('students').add(student);
  }
  getStudents() {
    return this.firestore.collection('students').snapshotChanges();
  }
  updateStudent(student: Estudiante, id: string) {
    console.log("modificado")
    return this.firestore.doc('students/' + id).update(student)
  }
}
