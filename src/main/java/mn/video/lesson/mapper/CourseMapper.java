package mn.video.lesson.mapper;

import mn.video.lesson.dto.CourseDTO;
import mn.video.lesson.entity.Course;

public class CourseMapper {
    public static CourseDTO mapToCourseDTO(Course course) {
        return new CourseDTO(
                course.getId(),
                course.getName(),
                course.getImgUrl(),
                course.getPrice(),
                course.getRealPrice(),
                course.getUserId());
    }

    public static Course mapToCourse(CourseDTO courseDTO) {
        return new Course(
                courseDTO.getName(),
                courseDTO.getImgUrl(),
                courseDTO.getPrice(),
                courseDTO.getRealPrice(),
                courseDTO.getUserId());
    }
}
