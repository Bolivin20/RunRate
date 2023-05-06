package com.example.runrate.repositories;

import com.example.runrate.entities.User;
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

        User findUserById(Long id);

        //void deleteById(Long id);

        void delete(User user);

       // @Modifying
       // @Query("DELETE FROM User u WHERE u.id = :id")
       // void deleteUserById(@Param("id") Long id);

}
