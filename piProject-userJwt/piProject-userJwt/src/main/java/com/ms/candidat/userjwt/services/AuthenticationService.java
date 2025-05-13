package com.ms.candidat.userjwt.services;

import com.ms.candidat.userjwt.models.*;
import com.ms.candidat.userjwt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService {

    @Value("${secret.key.admin}")
    private String adminSecret;

    @Value("${secret.key.hr}")
    private String hrSecret;

    @Value("${secret.key.supervisor}")
    private String supervisorSecret;
    @Autowired
    private UserRepository UserRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        // 🔍 Secret Key Validation
        if (request.getRole() == Role.ADMIN && !request.getSecretKey().equals(adminSecret)) {
            throw new RuntimeException("Invalid secret key for Admin registration!");
        }
        if (request.getRole() == Role.HR && !request.getSecretKey().equals(hrSecret)) {
            throw new RuntimeException("Invalid secret key for HR registration!");
        }
        if (request.getRole() == Role.SUPERVISOR && !request.getSecretKey().equals(supervisorSecret)) {
            throw new RuntimeException("Invalid secret key for Supervisor registration!");
        }
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())  // Use the role from the request
                .build();
        UserRepo.save(user);
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .statusCode(HttpStatus.OK.value())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = UserRepo.findByEmail(request.getEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .statusCode(HttpStatus.OK.value())
                .build();
    }

    public List<User> getAllUsers() {
        return UserRepo.findAll();
    }

    public User getUserById(Integer id) {
        return UserRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    public User getProfile() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        return UserRepo.findByEmail(username);
    }


}
