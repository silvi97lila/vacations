package com.vacations.app.repository;

import com.vacations.app.entity.CompensationDay;
import com.vacations.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompensationDayRepository extends JpaRepository<CompensationDay, Integer> {

    public CompensationDay save(CompensationDay newCompDay);

    @Query("SELECT c from CompensationDay c WHERE c.user_id=?1")
    List findByUser(User user);
}
