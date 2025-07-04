package com.goks.taskmanager.Service;

import com.goks.taskmanager.dto.TaskDTO;
import com.goks.taskmanager.Model.Task;
import com.goks.taskmanager.Model.User;
import com.goks.taskmanager.Repository.TaskRepository;
import com.goks.taskmanager.Repository.UserRepository;

import com.goks.taskmanager.Exception.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public TaskDTO addTask(TaskDTO dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setUser(user);

        taskRepository.save(task);

        return new TaskDTO(task.getId(), task.getTitle(), task.getDescription(), task.getDueDate());
    }

    public List<TaskDTO> getTasks(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("Resolved user ID: " + user.getId());

        return taskRepository.findByUser(user).stream()
                .map(task -> new TaskDTO(task.getId(),task.getTitle(), task.getDescription(), task.getDueDate()))
                .collect(Collectors.toList());

    }

    public void deleteTask(Long taskId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        taskRepository.delete(task);
    }
}
