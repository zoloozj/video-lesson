package mn.nomin.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import mn.nomin.demo.core.BaseEntity;

@Table(name = "lesson")
@Entity
public class Lesson extends BaseEntity {
    private String name, videoUrl, userEmail;
    private Integer lessonOrder;
    private boolean isFree;
    private Long courseId;

    public Lesson() {
    }

    public Lesson(String name, String videoUrl, String userEmail, Integer lessonOrder, boolean isFree, Long courseId) {
        setName(name);
        setVideoUrl(videoUrl);
        setUserEmail(userEmail);
        setOrder(lessonOrder);
        setIsFree(isFree);
        setCourseId(courseId);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Integer getLessonOrder() {
        return lessonOrder;
    }

    public void setOrder(Integer lessonOrder) {
        this.lessonOrder = lessonOrder;
    }

    public boolean getIsFree() {
        return isFree;
    }

    public void setIsFree(boolean isFree) {
        this.isFree = isFree;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
}
