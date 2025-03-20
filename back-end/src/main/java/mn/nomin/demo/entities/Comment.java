package mn.nomin.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import mn.nomin.demo.core.BaseEntity;

@Table(name = "comment")
@Entity
public class Comment extends BaseEntity {
    private String comment;
    private String userEmail;
    private Long courseId;

    // Default constructor
    public Comment() {
    }

    // Parameterized constructor
    public Comment(String comment, String userEmail, Long courseId) {
        this.comment = comment;
        this.userEmail = userEmail;
        this.courseId = courseId;
    }

    // Getters and Setters
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
}
