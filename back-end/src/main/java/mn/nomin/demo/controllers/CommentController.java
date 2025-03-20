package mn.nomin.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.nomin.demo.entities.Comment;
import mn.nomin.demo.services.impl.CommentServiceImpl;

@RequestMapping("/comment")
@RestController
public class CommentController {

    @Autowired
    private CommentServiceImpl commentService;

    // Create a new comment
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment savedComment = commentService.saveComment(comment);
        return ResponseEntity.ok(savedComment);
    }

    // Get a comment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        return commentService.findCommentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all comments
    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentService.findAllComments();
        return ResponseEntity.ok(comments);
    }

    // Update a comment by ID
    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment updatedComment) {
        try {
            Comment comment = commentService.updateComment(id, updatedComment);
            return ResponseEntity.ok(comment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a comment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommentById(@PathVariable Long id) {
        try {
            commentService.deleteCommentById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get comments by course ID
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Comment>> getCommentsByCourseId(@PathVariable Long courseId) {
        List<Comment> comments = commentService.findCommentsByCourseId(courseId);
        return ResponseEntity.ok(comments);
    }

}
