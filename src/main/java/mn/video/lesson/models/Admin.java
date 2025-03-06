package mn.video.lesson.model;

public class Admin {
    private int id;
    private String name, email, pass, token;

    public Admin() {

    }

    public Admin(String name, String email, String pass, String token) {
        this.setName(name);
        this.setEmail(email);
        this.setPass(pass);
        this.setToken(token);
    }

    public getID() {
        return id;
    }
    public getName() {
        return name;
    }
    public getEmail() {
        return email;
    }
    public getPass() {
        return pass;
    }
    public getToken() {
        return token;
    }

    public setName(String name) {
        this.name = name;
    }

    public setEmail(String email) {
        this.email = email;
    }

    public setPass(String pass) {
        this.pass = pass;   
    }

    public setToken(String token) {
        this.token = token;
    }
    
}
