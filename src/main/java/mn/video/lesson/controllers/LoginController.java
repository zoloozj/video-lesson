package mn.video.lesson.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.video.lesson.dto.LoginResponse;
import mn.video.lesson.entity.Login;
import mn.video.lesson.services.LoginService;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("login")
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping
    public ResponseEntity<Object> loginUser(@RequestBody Login login) {
        try {
            LoginResponse message = loginService.Login(login);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {

            LoginResponse response = new LoginResponse(e.getMessage(), HttpStatus.FAILED_DEPENDENCY.value());
            return new ResponseEntity<>(response, HttpStatus.FAILED_DEPENDENCY);
        }
    }
}
