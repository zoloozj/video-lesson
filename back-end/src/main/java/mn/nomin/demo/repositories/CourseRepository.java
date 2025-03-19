package mn.nomin.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mn.nomin.demo.entities.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    public List<Course> getCourseByUserEmail(String userEmail);
}
