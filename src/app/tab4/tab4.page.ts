import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiante'
import { StudentsService } from '../services/students.service'
import { AlertController, PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public students: Estudiante[];
  public toggle: boolean = false;
  constructor(private service: StudentsService,public alert:AlertController) {
    this.getStudents();
  }

  ngOnInit() {
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
  async age(student:Estudiante){
    const alert = await this.alert.create({
      header: 'Edad',
      message: student.age.toString(),
      buttons: ['OK']
    });

    
    await alert.present();
    this.Curp(student);
  }
  async Curp(student:Estudiante){
    const alert = await this.alert.create({
      header: 'Curp',
      message: student.curp,
      buttons: ['OK']
    });

    await alert.present();
  }
}
