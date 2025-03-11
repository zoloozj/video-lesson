package mn.video.lesson.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mn.video.lesson.dto.UserDTO;
import mn.video.lesson.entity.User;
import mn.video.lesson.exception.ResourceNotFoundException;
import mn.video.lesson.mapper.UserMapper;
import mn.video.lesson.repositories.UserRepo;
import mn.video.lesson.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = UserMapper.toUser(userDTO);
        User savedUser = userRepo.save(user);

        return UserMapper.toUserDTO(savedUser);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users.stream().map(UserMapper::toUserDTO).toList();
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Энэ ID-тай хэрэглэгч олдсонгүй" + id));
        return UserMapper.toUserDTO(user);
    }
}
