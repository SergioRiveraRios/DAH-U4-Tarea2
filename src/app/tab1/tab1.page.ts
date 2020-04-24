import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Estudiante } from 'src/app/models/estudiante'
import { StudentsService } from 'src/app/services/students.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public myForm: FormGroup;
  public student: Estudiante;
  constructor(private studentService: StudentsService, private fb: FormBuilder) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      name: [''],
      controlnumber: [''],
      curp: [''],
      age: [0],
      active: [false]
    });
    this.validations();
  }
  createStudent() {
    this.student = {
      name: this.myForm.get('name').value,
      controlnumber: this.myForm.get('controlnumber').value,
      curp: this.myForm.get('curp').value,
      age: this.myForm.get('age').value,
      active: this.myForm.get('active').value,
    }
    this.studentService.createStudent(this.student);
  }
  validations() {
    this.myForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ])],
      controlnumber: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      age: ['', Validators.compose([
        Validators.required
      ])],
      curp: ['', Validators.compose([
        Validators.pattern('[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][0-9][0-9][0-9][0-9][0-9][0-9][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][0-9][0-9]')
      ])],
      active: ['', Validators.compose([
        Validators.required
      ])]
    })
  }
}
