package mn.video.lesson.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mn.video.lesson.dto.CourseDTO;
import mn.video.lesson.entity.Course;
import mn.video.lesson.mapper.CourseMapper;
import mn.video.lesson.repositories.CourseRepo;
import mn.video.lesson.services.CourseService;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseRepo courseRepo;

    @Override
    public CourseDTO createCourse(CourseDTO courseDTO) {
        Course course = CourseMapper.mapToCourse(courseDTO);
        Course savedCourse = courseRepo.save(course);

        return CourseMapper.mapToCourseDTO(savedCourse);

    }

    @Override
    public List<CourseDTO> getCourses() {
        List<Course> courses = courseRepo.findAll();
        return courses.stream().map(CourseMapper::mapToCourseDTO).toList();
    }

}