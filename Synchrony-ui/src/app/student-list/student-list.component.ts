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
    setTimeout(() => {
      this.apiSeervice.getStudents().subscribe((data) => {
        this.student = data;
      });
    }, 500);
    // update the student list

  }
  searchStudent(searchValue: Event) {
    const searchString = searchValue.target as HTMLInputElement;
    console.log(searchString.value);
    if (searchString.value === '') {
      this.apiSeervice.getStudents().subscribe((data) => {
        this.student = data;
      });
    } else {
      this.apiSeervice.searchStudent(searchString.value).subscribe((data) => {
        this.student = data;
      });

    }

  }


}
