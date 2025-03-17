package mn.nomin.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mn.nomin.demo.entities.Lesson;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

}
