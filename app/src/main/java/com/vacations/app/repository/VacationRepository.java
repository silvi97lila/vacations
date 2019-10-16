package com.vacations.app.repository;

import com.vacations.app.entity.User;
import com.vacations.app.entity.Vacation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VacationRepository extends JpaRepository<Vacation, Integer> {
    @Query("SELECT v from Vacation v WHERE v.user_id=?1")
    List findByUser(User user);
}
