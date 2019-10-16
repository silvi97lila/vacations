package com.vacations.app.controller;

import com.vacations.app.entity.DaysOff;
import com.vacations.app.entity.User;
import com.vacations.app.entity.Vacation;
import com.vacations.app.repository.DaysOffRepository;
import com.vacations.app.repository.UserRepository;
import com.vacations.app.service.DaysOffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/daysoff")
public class DaysOffController {

    @Autowired
    private DaysOffService daysOffService;

    @Autowired
    private DaysOffRepository daysOffRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public List<DaysOff> index(){
        return daysOffService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<?> findById(@PathVariable int id){
        return daysOffService.findById(id);
    }

    @PostMapping("/")
    public DaysOff save(@RequestBody DaysOff daysOff, Authentication authentication){
        String username=authentication.getName();
        User user=userRepository.findByUsername(username);
        if (user !=null) daysOff.setUser_id(user);
        daysOffService.saveOrUpdate(daysOff);
        return daysOff;
    }

    @PostMapping("/enable")
    public DaysOff enableVacation(@RequestBody DaysOff daysOff){
        DaysOff doff=daysOffRepository.getOne(daysOff.getId());
        doff.setEnable(true);
        daysOffService.saveOrUpdate(doff);
        return doff;
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable int id)throws Exception {
        daysOffService.deleteById(id);
    }
}
