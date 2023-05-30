package com.example.runrate.repositories;

import com.example.runrate.entities.ProfileDetail;
import com.example.runrate.entities.Training;
import com.example.runrate.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;


@Repository
public interface ProfileDetailRepo extends JpaRepository<ProfileDetail, Long> {

    @Transactional
    @Query(nativeQuery = true, value = "SELECT updated_at FROM profile_detail WHERE id_user= :idUser")
    Date findUpdatedAtByIdUser(@Param("idUser") Long idUser);

    @Transactional
    @Query(nativeQuery = true, value = "SELECT points FROM profile_detail WHERE id_user= :id")
    Double findPointsByIdUser(@Param("id") Long idUser);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(nativeQuery = true, value = "UPDATE profile_detail SET updated_at= :updatedAt WHERE id= :id")
    void updateUpdatedAt(@Param("id") Long idUser, @Param("updatedAt") Date updatedAt);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(nativeQuery = true, value = "UPDATE profile_detail SET points= :points * points WHERE id= :id")
    void updatePoints(@Param("id") Long idUser, @Param("points") double points);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(nativeQuery = true, value = "UPDATE profile_detail SET points= :points + points WHERE id= :id")
    void addPoints(@Param("id") Long idUser, @Param("points") double points);

}
