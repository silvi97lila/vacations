package com.vacations.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class DaysOff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "Title should not be blank")
    private String title;
    @Column(name = "day_off")
    @JsonFormat(pattern = "yyy-mm-dd")
    private Date dayOff;
    @NotBlank(message = "Description should not be blank")
    private String description;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user_id;
    @Column(name = "enable")
    private boolean enable;
    private Date created_at;

    public DaysOff() {
        this.created_at = new Date();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDayOff() {
        return dayOff;
    }

    public void setDayOff(Date dayOff) {
        this.dayOff = dayOff;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser_id() {
        return user_id;
    }

    public void setUser_id(User user_id) {
        this.user_id = user_id;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }
}
