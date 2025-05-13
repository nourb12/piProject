package com.esprit.stage.Controller;

import com.esprit.stage.Entities.User;
import com.esprit.stage.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pi/Meeting/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    @PostMapping
  public User createUser(@RequestBody User user) {
      return userService.adduser(user);
    }

}
