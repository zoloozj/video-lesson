package mn.video.lesson.dto;

import mn.video.lesson.utils.PasswordUtils;

public class UserDTO {
    private Long id;
    private String name, email, pass, token, salt;
    private Integer is_teacher;

    // No-args constructor
    public UserDTO() {
    }

    // All-args constructor
    public UserDTO(Long id, String name, String email, String pass, String token, Integer is_teacher) {
        this.id = id;
        this.name = name;
        this.email = email;
        setPass(pass);
        this.token = token;
        this.is_teacher = is_teacher;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt() {
        String salt = PasswordUtils.getSalt(10);
        this.salt = salt;
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
        String newPass = PasswordUtils.encryptPass(pass);
        this.pass = newPass;
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
