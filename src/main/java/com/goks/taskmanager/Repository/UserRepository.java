package com.goks.taskmanager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;
import com.goks.taskmanager.Model.User;

import java.util.*;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}