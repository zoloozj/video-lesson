package mn.video.lesson.mapper;

import mn.video.lesson.dto.UserDTO;
import mn.video.lesson.entity.User;

public class UserMapper {
    public static UserDTO toUserDTO(User user) {
        if (user == null) {
            return null;
        }
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPass(),
                user.getToken(),
                user.getIsTeacher());
    }

    public static User toUser(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        return new User(
                userDTO.getName(),
                userDTO.getEmail(),
                userDTO.getPass(),
                userDTO.getToken(),
                userDTO.getIsTeacher());
    }
}
