package mn.nomin.demo.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import mn.nomin.demo.core.BaseServiceImpl;
import mn.nomin.demo.entities.Course;
import mn.nomin.demo.repositories.CourseRepository;
import mn.nomin.demo.services.CourseService;

@Service
public class CourseServiceImpl extends BaseServiceImpl<Course> implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public JpaRepository<Course, Long> getRepo() {
        return courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id).stream().filter(course -> course.getId().equals(id)).findFirst();
    }

    public Course saveCourse(Course course) {
        courseRepository.save(course);
        return course;
    }

    public void deleteCourse(Long id) {
        Optional<Course> course = courseRepository.findById(id);
        course.ifPresent(courseRepository::delete);
    }

}
