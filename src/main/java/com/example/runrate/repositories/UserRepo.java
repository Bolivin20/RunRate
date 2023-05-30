package com.example.runrate.repositories;

import com.example.runrate.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

        //User findByEmail(String email);

        Optional<User> findByEmail(String email);

        void delete(User user);

        @Transactional
        @Query(nativeQuery = true, value = "SELECT name FROM users WHERE id= :id")
        String findNameById(@Param("id") Long id);


}
