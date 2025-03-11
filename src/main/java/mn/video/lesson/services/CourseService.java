package mn.video.lesson.services;

import java.util.List;

import mn.video.lesson.dto.CourseDTO;

public interface CourseService {

    // Create Course
    CourseDTO createCourse(CourseDTO courseDTO);

    // Get All Courses
    List<CourseDTO> getCourses();
}
