import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service'
import { Estudiante } from 'src/app/models/estudiante'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public students: Estudiante[];
  constructor(private service: StudentsService) {
    this.getStudents()
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
