package mn.video.lesson.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import mn.video.lesson.entity.Course;

public interface CourseRepo extends JpaRepository<Course, Long> {

}
