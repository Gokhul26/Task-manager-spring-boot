package com.goks.taskmanager.Repository;

import com.goks.taskmanager.Model.Task;
import com.goks.taskmanager.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(Long userId);
    List<Task> findByUser(User user);
}
