package com.goks.taskmanager.Controller;

import com.goks.taskmanager.dto.TaskDTO;
import com.goks.taskmanager.Service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // POST /tasks
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO, Principal principal) {
        String username = principal.getName();
        TaskDTO createdTask = taskService.addTask(taskDTO, username);
        return ResponseEntity.ok(createdTask);
    }

    // GET /tasks
    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasks(Principal principal) {
        String username = principal.getName();
        List<TaskDTO> tasks = taskService.getTasks(username);
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, Principal principal) {
        String username = principal.getName();
        taskService.deleteTask(id, username);
        return ResponseEntity.noContent().build();
    }
}
