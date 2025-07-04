package com.goks.taskmanager.dto;

import java.util.List;

public class UserDTO {

    private Long id;
    private String username;
    private List<TaskDTO> tasks;

    // Constructors
    public UserDTO() {}

    public UserDTO(Long id, String username, List<TaskDTO> tasks) {
        this.id = id;
        this.username = username;
        this.tasks = tasks;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskDTO> tasks) {
        this.tasks = tasks;
    }
}
