package mn.video.lesson.services;

import mn.video.lesson.dto.LoginResponse;
import mn.video.lesson.entity.Login;

public interface LoginService {
    LoginResponse Login(Login login);
}
