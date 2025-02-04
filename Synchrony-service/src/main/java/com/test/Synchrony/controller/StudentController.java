package com.test.Synchrony.controller;

import com.test.Synchrony.dto.StudentDto;
import com.test.Synchrony.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/addStudent")
    public ResponseEntity<String> addStudent(@RequestBody StudentDto studentDto) {
        return studentService.addStudent(studentDto);
    }
    @GetMapping("/getAllStudents")
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        return studentService.getAllStudents();
    }
    @GetMapping("/searchStudent/{studentName}")
    public ResponseEntity<List<StudentDto>> searchStudent(@PathVariable("studentName") String studentName) {
        return studentService.searchStudent(studentName);
    }
    @PatchMapping("/updateStudent")
    public ResponseEntity<String> updateStudent(@RequestBody StudentDto studentDto) {
        return studentService.updateStudent(studentDto);
    }
    @DeleteMapping("/deleteStudent/{studentId}")
    public ResponseEntity<String> deleteStudent(@PathVariable("studentId") Long studentId) {
        return studentService.deleteStudent(studentId);
    }
}
