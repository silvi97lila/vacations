package com.vacations.app.controller;

import com.vacations.app.entity.User;
import com.vacations.app.payload.LoginRequest;
import com.vacations.app.payload.LoginResponse;
import com.vacations.app.secuirty.JWTToken;
import com.vacations.app.secuirty.SecurityConstants;
import com.vacations.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTToken jwtToken;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/{id}")
    public Optional<User> findUserById(@PathVariable Long id){
        return userService.findUserById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser( @RequestBody LoginRequest loginRequest){
        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt= SecurityConstants.TOKEN_PREFIX + jwtToken.generateToken(authentication);
        return ResponseEntity.ok(new LoginResponse(true, jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        User newUser=userService.saveUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }


}
