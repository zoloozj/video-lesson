package mn.nomin.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mn.nomin.demo.entities.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
