package com.vacations.app.repository;

import com.vacations.app.entity.DaysOff;
import com.vacations.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DaysOffRepository extends JpaRepository<DaysOff, Integer> {

     @Query("SELECT d from DaysOff d WHERE d.user_id=?1")
     List findByUser(User user);
}
