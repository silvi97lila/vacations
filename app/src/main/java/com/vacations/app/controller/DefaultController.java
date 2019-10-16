package com.vacations.app.controller;

import com.vacations.app.entity.CompensationDay;
import com.vacations.app.entity.DaysOff;
import com.vacations.app.entity.User;
import com.vacations.app.entity.Vacation;
import com.vacations.app.repository.CompensationDayRepository;
import com.vacations.app.repository.DaysOffRepository;
import com.vacations.app.repository.UserRepository;
import com.vacations.app.repository.VacationRepository;
import com.vacations.app.service.CompensationDayService;
import com.vacations.app.service.DaysOffService;
import com.vacations.app.service.VacatonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/data")
public class DefaultController {

    @Autowired
    private UserRepository userRepository;

    private VacatonService vacatonService;

    private DaysOffService daysOffService;

    private CompensationDayService compensationDayService;

    public DefaultController(VacatonService vService, DaysOffService dService, CompensationDayService cService){
        this.vacatonService=vService;
        this.daysOffService=dService;
        this.compensationDayService=cService;
    }

    @GetMapping("/{id}")
    public HashMap getDataByUserID(@PathVariable  Long id){
        User user=userRepository.getById(id);
        HashMap<String, List> dataSet=new HashMap<>();

        List<Vacation> vacation=vacatonService.findByUser(user);
        List<DaysOff> daysOffs=daysOffService.findByUserId(user);
        List<CompensationDay> compensationDays=compensationDayService.findByUser(user);

        dataSet.put("Vacations", vacation);
        dataSet.put("DaysOff", daysOffs);
        dataSet.put("CompensationDay", compensationDays);

        return dataSet;
    }
}
