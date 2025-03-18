package mn.nomin.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mn.nomin.demo.entities.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}
