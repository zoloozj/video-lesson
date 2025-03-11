package mn.video.lesson.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import mn.video.lesson.dto.LoginResponse;
import mn.video.lesson.entity.Login;
import mn.video.lesson.entity.User;
import mn.video.lesson.repositories.UserRepo;
import mn.video.lesson.services.LoginService;

@Service
public class LoginImpl implements LoginService {
    @Autowired
    UserRepo userRepo;

    @Override
    public LoginResponse Login(Login login) {
        List<User> users = userRepo.findAll();
        for (User user : users) {
            if (login.getEmail().equals(user.getEmail())) {
                if (login.getPass().equals(user.getPass())) {
                    LoginResponse response = new LoginResponse("Амжилттай нэвтэрлээ", HttpStatus.OK.value());
                    return response;

                } else {
                    LoginResponse response = new LoginResponse("Нууц үг буруу байна!", HttpStatus.NOT_FOUND.value());
                    return response;
                }
            } else {
                LoginResponse response = new LoginResponse("Хэрэглэгч олдсонгүй!", HttpStatus.NOT_FOUND.value());
                return response;
            }
        }
        return null;
    }

}
