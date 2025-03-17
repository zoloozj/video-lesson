package mn.nomin.demo.services.impl;

import mn.nomin.demo.core.BaseServiceImpl;
import mn.nomin.demo.entities.User;
import mn.nomin.demo.repositories.UserRepository;
import mn.nomin.demo.services.UserService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public JpaRepository<User, Long> getRepo() {
        return userRepository;
    }
}
