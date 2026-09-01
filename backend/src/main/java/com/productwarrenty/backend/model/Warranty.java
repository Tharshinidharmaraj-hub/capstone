package com.productwarrenty.backend.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Warranty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int productId;
    private String startDate;
    private String endDate;
    private String status;
    public Warranty() {
    }
    public Warranty(int productId, String startDate, String endDate, String status) {
        this.productId = productId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
    public int getId() {
        return id;
    }
    public int getProductId() {
        return productId;
    }
    public String getStartDate() {
        return startDate;
    }
    public String getEndDate() {
        return endDate;
    }
    public String getStatus() {
        return status;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setProductId(int productId) {
        this.productId = productId;
    }
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
