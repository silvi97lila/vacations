package com.vacations.app.controller;

import com.vacations.app.entity.CompensationDay;
import com.vacations.app.entity.DaysOff;
import com.vacations.app.entity.User;
import com.vacations.app.repository.CompensationDayRepository;
import com.vacations.app.repository.UserRepository;
import com.vacations.app.service.CompensationDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/compensationday")
public class CompensationDayController {

    @Autowired
    private CompensationDayService service;

    @Autowired
    private CompensationDayRepository compensationDayRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public List<?> findAll(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Optional<?> findById(@PathVariable int id){
        return service.findById(id);
    }

    @PostMapping("/")
    public CompensationDay save(@RequestBody CompensationDay compDay, Authentication authentication){
        String username=authentication.getName();
        User user=userRepository.findByUsername(username);
        if (user !=null) compDay.setUser_id(user);
        service.saveOrUpdate(compDay);
        return compDay;
    }

    @PostMapping("/enable")
    public CompensationDay enableVacation(@RequestBody CompensationDay compensationDay){
        CompensationDay cDay=compensationDayRepository.getOne(compensationDay.getId());
        cDay.setEnable(true);
        service.saveOrUpdate(cDay);
        return cDay;
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable int id) throws Exception{
        service.deleteById(id);
    }
}
