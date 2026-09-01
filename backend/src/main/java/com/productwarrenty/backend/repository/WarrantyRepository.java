package com.productwarrenty.backend.repository;
import com.productwarrenty.backend.model.Warranty;
import org.springframework.data.jpa.repository.JpaRepository;
public interface WarrantyRepository extends JpaRepository<Warranty, Integer> {
}