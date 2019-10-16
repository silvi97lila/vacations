package com.vacations.app.service;

import com.vacations.app.entity.User;
import com.vacations.app.entity.Vacation;
import com.vacations.app.repository.UserRepository;
import com.vacations.app.repository.VacationRepository;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VacatonService {

    @Autowired
    private VacationRepository vacationRepository;

    public List<Vacation> findAll(){
        return vacationRepository.findAll();
    }

    public Optional<Vacation> findById(Integer id){
        return vacationRepository.findById(id);
    }

    public Vacation saveOrUpdateVacation(Vacation vacation){
        return vacationRepository.save(vacation);
    }

    public void deleteById(int vacaton_id) throws Exception {
        Optional<Vacation> vacation=vacationRepository.findById(vacaton_id);
        if (vacation == null){
            throw new Exception("Vacation not found");
        }
        vacationRepository.deleteById(vacaton_id);
    }

    public List findByUser(User user){
        return vacationRepository.findByUser(user);
    }
}
