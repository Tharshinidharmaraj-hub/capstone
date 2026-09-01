package com.productwarrenty.backend.service;
import com.productwarrenty.backend.model.Product;
import com.productwarrenty.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ProductService {
    private final ProductRepository productRepository;
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
    public List<Product> getProducts() {
        return productRepository.findAll();
    }
}