package com.productwarrenty.backend.service;
import com.productwarrenty.backend.model.Warranty;
import com.productwarrenty.backend.repository.WarrantyRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class WarrantyService {
    private final WarrantyRepository warrantyRepository;
    public WarrantyService(WarrantyRepository warrantyRepository) {
        this.warrantyRepository = warrantyRepository;
    }
    public Warranty addWarranty(Warranty warranty) {
        return warrantyRepository.save(warranty);
    }
    public List<Warranty> getWarranties() {
        return warrantyRepository.findAll();
    }
}