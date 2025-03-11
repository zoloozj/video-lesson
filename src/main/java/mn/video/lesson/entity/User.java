package mn.video.lesson.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name, email, pass, token;
    private Integer is_teacher;

    // No-args constructor
    public User() {
    }

    // All-args constructor
    public User(String name, String email, String pass, String token, Integer is_teacher) {
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.token = token;
        this.is_teacher = is_teacher;
    }

    // Getter and Setter methods
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getIsTeacher() {
        return is_teacher;
    }

    public void setIsTeacher(Integer is_teacher) {
        this.is_teacher = is_teacher;
    }
}
