package com.test.Synchrony.service;

import com.test.Synchrony.dto.StudentDto;
import com.test.Synchrony.entity.Student;
import com.test.Synchrony.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    StudentRepo studentRepo;

    public ResponseEntity<String> addStudent(StudentDto studentDto) {
        if(studentDto.getAge()==null || studentDto.getName()==null || studentDto.getClassName()==null || studentDto.getPhoneNumber()==null){
            return ResponseEntity.badRequest().body("Invalid input");
        }
        Student student = new Student();
        student.setAge(studentDto.getAge());
        student.setName(studentDto.getName());
        student.setClassName(studentDto.getClassName());
        student.setPhoneNumber(studentDto.getPhoneNumber());
        studentRepo.save(student);
        return ResponseEntity.ok("Student added successfully");
    }


    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<Student> studentList = studentRepo.findAll();
        List<StudentDto> studentDtoList = studentList.stream().map(student -> {
            StudentDto studentDto = new StudentDto();
            studentDto.setId(student.getId());
            studentDto.setName(student.getName());
            studentDto.setAge(student.getAge());
            studentDto.setClassName(student.getClassName());
            studentDto.setPhoneNumber(student.getPhoneNumber());
            return studentDto;
        }).toList();
        return ResponseEntity.ok(studentDtoList);
    }

    public ResponseEntity<List<StudentDto>> searchStudent(String studentName) {
        List<Student> studentList=studentRepo.searchByName(studentName);
        List<StudentDto> studentDtoList=studentList.stream().map(student -> {
            StudentDto studentDto=new StudentDto();
            studentDto.setId(student.getId());
            studentDto.setName(student.getName());
            studentDto.setAge(student.getAge());
            studentDto.setClassName(student.getClassName());
            studentDto.setPhoneNumber(student.getPhoneNumber());
            return studentDto;
        }).toList();
        return ResponseEntity.ok(studentDtoList);
    }

    public ResponseEntity<String> updateStudent(StudentDto studentDto) {
        if(studentDto.getId()==null){
            return ResponseEntity.badRequest().body("Invalid input");
        }
        Student student=studentRepo.findById(studentDto.getId()).orElse(null);
        if(student==null){
            return ResponseEntity.notFound().build();
        }
        if(studentDto.getName()!=null){
            student.setName(studentDto.getName());
        }
        if(studentDto.getAge()!=null){
            student.setAge(studentDto.getAge());
        }
        if(studentDto.getClassName()!=null){
            student.setClassName(studentDto.getClassName());
        }
        if(studentDto.getPhoneNumber()!=null){
            student.setPhoneNumber(studentDto.getPhoneNumber());
        }
        studentRepo.save(student);
        return ResponseEntity.ok("Student updated successfully");

    }

    public ResponseEntity<String> deleteStudent(Long studentId) {
        Student student=studentRepo.findById(studentId).orElse(null);
        if(student==null){
            return ResponseEntity.notFound().build();
        }
        studentRepo.deleteById(studentId);
        return ResponseEntity.ok("Student deleted successfully");
    }
}
