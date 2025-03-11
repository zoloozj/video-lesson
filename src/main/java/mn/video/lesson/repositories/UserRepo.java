package mn.video.lesson.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import mn.video.lesson.entity.User;

public interface UserRepo extends JpaRepository<User, Long> {

}
