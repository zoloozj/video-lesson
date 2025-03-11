package mn.video.lesson.entity;

import mn.video.lesson.utils.PasswordUtils;

public class Login {
    private String email, pass;

    public String getEmail() {
        return email;
    }

    public String getPass() {
        String newPass = PasswordUtils.encryptPass(pass);
        return newPass;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

}
