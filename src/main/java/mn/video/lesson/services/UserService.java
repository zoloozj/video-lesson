package mn.video.lesson.services;

import java.util.List;

import mn.video.lesson.dto.UserDTO;

public interface UserService {

    UserDTO createUser(UserDTO userDTO);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id);

}
