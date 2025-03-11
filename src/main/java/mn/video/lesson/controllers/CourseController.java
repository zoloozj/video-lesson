package mn.video.lesson.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.video.lesson.dto.CourseDTO;
import mn.video.lesson.services.CourseService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController()
@RequestMapping("/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping
    public ResponseEntity<String> createCourse(@RequestBody CourseDTO courseDto) {
        try {
            courseService.createCourse(courseDto);
            return new ResponseEntity<>("Амжилттай", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FAILED_DEPENDENCY);
        }
    }

    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAllCourse() {
        try {
            List<CourseDTO> courseDTOs = courseService.getCourses();
            return ResponseEntity.ok(courseDTOs);
        } catch (Exception e) {
            return new ResponseEntity<>(List.of(), HttpStatus.FAILED_DEPENDENCY);
        }
    }

}