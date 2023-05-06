package com.example.runrate.repositories;

import com.example.runrate.entities.Training;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TrainingRepo extends JpaRepository<Training, Long> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(nativeQuery = true, value = "SELECT * FROM training WHERE id_user= :id")
    List<Training> findAllTrainingsByIdUser(@Param("id") Long idUser);

    void deleteById(Long id);


}