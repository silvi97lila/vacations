package com.vacations.app.controller;

import com.vacations.app.entity.User;
import com.vacations.app.entity.Vacation;
import com.vacations.app.repository.UserRepository;
import com.vacations.app.repository.VacationRepository;
import com.vacations.app.secuirty.SecurityConstants;
import com.vacations.app.service.VacatonService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/vacation")
public class VacationController {

    @Autowired
    private VacatonService service;

    @Autowired
    private VacationRepository vacationRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public List<Vacation> findAll(){
        return service.findAll();
    }

    @GetMapping("/{vacation_id}")
    public Optional<Vacation> index(@PathVariable int vacation_id){
        return service.findById(vacation_id);
    }


    @PostMapping("/")
    public Vacation save(@RequestBody Vacation vacation, Authentication authentication){
        String username=authentication.getName();
        User user=userRepository.findByUsername(username);

        if (user !=null) vacation.setUser_id(user);
        service.saveOrUpdateVacation(vacation);
        return vacation;
    }
    @PostMapping("/enable")
    public Vacation enableVacation(@RequestBody Vacation vacation){
        Vacation vac=vacationRepository.getOne(vacation.getId());
        vac.setEnable(true);
        service.saveOrUpdateVacation(vac);
        return vac;
    }

    @DeleteMapping("/{vacation_id}")
    public void deleteById(@PathVariable int vacation_id) throws Exception{
        service.deleteById(vacation_id);
    }

}
