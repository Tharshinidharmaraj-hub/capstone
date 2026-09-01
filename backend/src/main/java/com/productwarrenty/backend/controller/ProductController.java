package com.productwarrenty.backend.controller;
import com.productwarrenty.backend.model.Product;
import com.productwarrenty.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }
    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }
}