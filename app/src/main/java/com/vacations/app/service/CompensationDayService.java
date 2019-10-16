package com.vacations.app.service;

import com.vacations.app.entity.CompensationDay;
import com.vacations.app.entity.User;
import com.vacations.app.repository.CompensationDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompensationDayService {

    @Autowired
    private CompensationDayRepository compensationDayRepository;

    public List<?> findAll(){
        return compensationDayRepository.findAll();
    }

    public Optional<?> findById(int id){
        return compensationDayRepository.findById(id);
    }

    public CompensationDay saveOrUpdate(CompensationDay compensationDay){
        return  compensationDayRepository.save(compensationDay);
    }

    public void deleteById(int vacaton_id) throws Exception {
        Optional<CompensationDay> compday=compensationDayRepository.findById(vacaton_id);
        if (compday == null){
            throw new Exception("Vacation not found");
        }
        compensationDayRepository.deleteById(vacaton_id);
    }

    public List findByUser(User user){
        return compensationDayRepository.findByUser(user);
    }
}
