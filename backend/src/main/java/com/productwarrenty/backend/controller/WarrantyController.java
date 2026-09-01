package com.productwarrenty.backend.controller;
import com.productwarrenty.backend.model.Warranty;
import com.productwarrenty.backend.service.WarrantyService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/warranties")
public class WarrantyController {
    private final WarrantyService warrantyService;
    public WarrantyController(WarrantyService warrantyService) {
        this.warrantyService = warrantyService;
    }
    @PostMapping
    public Warranty addWarranty(@RequestBody Warranty warranty) {
        return warrantyService.addWarranty(warranty);
    }
    @GetMapping
    public List<Warranty> getWarranties() {
        return warrantyService.getWarranties();
    }
}