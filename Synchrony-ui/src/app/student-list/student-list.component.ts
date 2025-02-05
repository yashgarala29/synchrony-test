import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  student: any[] = [];
  studentVal: any;
  displayedColumns: string[] = ['id', 'name', 'age', 'className', 'phoneNumber'];
  constructor(private apiSeervice: ApiServiceService) {
  }
  ngOnInit(): void {
    this.apiSeervice.getStudents().subscribe((data) => {
      this.student = data;
    })

  }
  deleteStudent(id: number) {
    this.apiSeervice.deleteStudent(id).subscribe((data) => {
      console.log(data);
      this.onUpdateClick()

    })
  }
  editStudent(student: any) {
    this.studentVal = student;
  }
  onUpdateClick() {
    // update the student list
    this.apiSeervice.getStudents().subscribe((data) => {
      this.student = data;
    });

  }


}
