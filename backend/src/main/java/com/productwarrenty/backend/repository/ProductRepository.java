package com.productwarrenty.backend.repository;
import com.productwarrenty.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProductRepository extends JpaRepository<Product, Long> {
}