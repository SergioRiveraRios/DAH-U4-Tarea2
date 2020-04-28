import { Component } from '@angular/core';
import {StudentsService} from '../services/students.service'
import {Estudiante} from '../models/estudiante'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public students: Estudiante[];
  constructor(private service:StudentsService) {
    this.getStudents();
  }
  getStudents() {
    this.service.getStudents().subscribe(data => {
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        } as Estudiante;
      });
    });
  }
}
