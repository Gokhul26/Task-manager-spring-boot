package com.goks.taskmanager.dto;

import java.time.LocalDate;

public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;

    // Constructors
    public TaskDTO() {}

//    public TaskDTO(String title, String description, LocalDate dueDate) {
//        this.title = title;
//        this.description = description;
//        this.dueDate = dueDate;
//    }

    public TaskDTO(Long id, String title, String description, LocalDate dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
}
