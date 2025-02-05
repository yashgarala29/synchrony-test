import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit,OnChanges {
  studentForm!: FormGroup;
  students: any[] = [];
  isEdit = false;
  @Input() studentData: any;
  @Output() updateClicked = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private studentService: ApiServiceService) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      className: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    })
    console.log(this.studentData);
  }
  onSubmit() {
    if (this.studentForm.valid) {
      if(this.isEdit){
        this.studentService.updateStudent(this.studentForm.value).subscribe(updatedStudent => {
          this.studentForm.reset();
          this.isEdit = false;
        });
        this.updateClicked.emit();
      }else{
      this.studentService.addStudent(this.studentForm.value).subscribe(newStudent => {
        // console.log(newStudent.data);
        this.studentForm.reset();
      });
      this.updateClicked.emit();
    }
    }
  }
  ngOnChanges(changes:SimpleChanges) {
    if(changes['studentData']){
      console.log(this.studentData);
      this.studentForm.patchValue({
        id: this.studentData.id,
        name: this.studentData.name,
        age: this.studentData.age,
        className: this.studentData.className,
        phoneNumber: this.studentData.phoneNumber
      })
      this.isEdit = true;
    }
  }


}
