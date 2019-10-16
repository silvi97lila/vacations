package com.vacations.app.service;

import com.vacations.app.entity.DaysOff;
import com.vacations.app.entity.User;
import com.vacations.app.repository.DaysOffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DaysOffService {

    @Autowired
    private DaysOffRepository daysOffRepository;

    public List<DaysOff> findAll(){
        return daysOffRepository.findAll();
    }

    public Optional<?> findById(int id){
        return daysOffRepository.findById(id);
    }

    public DaysOff saveOrUpdate(DaysOff newDaysOff){
        return daysOffRepository.save(newDaysOff);
    }

    public void deleteById(int vacaton_id) throws Exception {
        Optional<DaysOff> vacation=daysOffRepository.findById(vacaton_id);
        if (vacation == null){
            throw new Exception("Vacation not found");
        }
        daysOffRepository.deleteById(vacaton_id);
    }

    public List findByUserId(User user){
        return daysOffRepository.findByUser(user);
    }
}
