package mn.nomin.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.nomin.demo.entities.Course;
import mn.nomin.demo.services.impl.CourseServiceImpl;

@RequestMapping("/course")
@RestController
public class CourseController {
    private final CourseServiceImpl courseServiceImpl;

    public CourseController(CourseServiceImpl courseServiceImpl) {
        this.courseServiceImpl = courseServiceImpl;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseServiceImpl.getAllCourses();
    }

    @PostMapping("/user")
    public ResponseEntity<List<Course>> getCoursesByUserEmail(@RequestBody String userEmail) {
        List<Course> courses = courseServiceImpl.getCoursesByUserEmail("zoljargal.b@gmail.com");
        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(courses);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseServiceImpl.getCourseById(id);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseServiceImpl.saveCourse(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Optional<Course> courseOptional = courseServiceImpl.getCourseById(id);
        if (courseOptional.isPresent()) {
            Course course = courseOptional.get();
            course.setName(courseDetails.getName());
            course.setImgUrl(courseDetails.getImgUrl());
            course.setPrice(courseDetails.getPrice());
            course.setRealPrice(courseDetails.getRealPrice());
            return ResponseEntity.ok(courseServiceImpl.saveCourse(course));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        Optional<Course> course = courseServiceImpl.getCourseById(id);
        if (course.isPresent()) {
            courseServiceImpl.deleteCourse(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
