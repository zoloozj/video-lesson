package mn.nomin.demo;

import mn.nomin.demo.services.AuthenticationService;
import mn.nomin.demo.dtos.ChangePasswordDto;
import mn.nomin.demo.entities.User;
import mn.nomin.demo.repositories.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthenticationServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationService authenticationService;

    private User mockUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mock authenticated user
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setPassword("encodedOldPassword"); // Simulated encoded password
    }

    @Test
    void changePassword_ShouldChangePassword_WhenOldPasswordIsCorrect() {
        // Arrange
        ChangePasswordDto changePasswordDto = new ChangePasswordDto();
        changePasswordDto.setOldPassword("correctOldPassword");
        changePasswordDto.setNewPassword("newPassword");

        when(passwordEncoder.matches("correctOldPassword", mockUser.getPassword())).thenReturn(true);
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");
        when(userRepository.save(mockUser)).thenReturn(mockUser);

        // Act
        authenticationService.changePassword(changePasswordDto);

        // Assert
        verify(passwordEncoder).matches("correctOldPassword", mockUser.getPassword());
        verify(passwordEncoder).encode("newPassword");
        verify(userRepository).save(mockUser);
        assertEquals("encodedNewPassword", mockUser.getPassword());
    }

    @Test
    void changePassword_ShouldThrowException_WhenOldPasswordIsIncorrect() {
        // Arrange
        ChangePasswordDto changePasswordDto = new ChangePasswordDto();
        changePasswordDto.setOldPassword("incorrectOldPassword");
        changePasswordDto.setNewPassword("newPassword");

        when(passwordEncoder.matches("incorrectOldPassword", mockUser.getPassword())).thenReturn(false);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            authenticationService.changePassword(changePasswordDto);
        });

        assertEquals("Old password is incorrect.", exception.getMessage());
        verify(passwordEncoder).matches("incorrectOldPassword", mockUser.getPassword());
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
    }
}