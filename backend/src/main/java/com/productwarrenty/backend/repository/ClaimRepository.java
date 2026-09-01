package com.productwarrenty.backend.repository;
import com.productwarrenty.backend.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ClaimRepository extends JpaRepository<Claim, Integer> {
}