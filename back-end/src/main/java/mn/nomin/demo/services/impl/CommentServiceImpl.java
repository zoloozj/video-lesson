package mn.nomin.demo.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import mn.nomin.demo.core.BaseServiceImpl;
import mn.nomin.demo.entities.Comment;
import mn.nomin.demo.repositories.CommentRepository;
import mn.nomin.demo.services.CommentService;

@Service
public class CommentServiceImpl extends BaseServiceImpl<Comment> implements CommentService {

    @Autowired
    private CommentRepository repository;

    @Override
    public JpaRepository<Comment, Long> getRepo() {
        return repository;
    }

    // Save a new comment
    public Comment saveComment(Comment comment) {
        return repository.save(comment);
    }

    // Find a comment by ID
    public Optional<Comment> findCommentById(Long id) {
        return repository.findById(id);
    }

    // Get all comments
    public List<Comment> findAllComments() {
        return repository.findAll();
    }

    // Update an existing comment
    public Comment updateComment(Long id, Comment updatedComment) {
        return repository.findById(id).map(comment -> {
            comment.setComment(updatedComment.getComment());
            comment.setUserEmail(updatedComment.getUserEmail());
            comment.setCourseId(updatedComment.getCourseId());
            return repository.save(comment);
        }).orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));
    }

    // Delete a comment by ID
    public void deleteCommentById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Comment not found with id: " + id);
        }
    }

    // Find comments by course ID
    public List<Comment> findCommentsByCourseId(Long courseId) {
        return repository.findAll().stream()
                .filter(comment -> courseId.equals(comment.getCourseId()))
                .toList();
    }
}
