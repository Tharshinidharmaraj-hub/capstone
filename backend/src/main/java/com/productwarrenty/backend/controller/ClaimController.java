package com.productwarrenty.backend.controller;
import com.productwarrenty.backend.model.Claim;
import com.productwarrenty.backend.service.ClaimService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/claims")
public class ClaimController {
    private final ClaimService claimService;
    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }
    @PostMapping
    public Claim addClaim(@RequestBody Claim claim) {
        return claimService.addClaim(claim);
    }
    @GetMapping
    public List<Claim> getClaims() {
        return claimService.getClaims();
    }
    @PutMapping("/{id}/status")
    public Claim updateClaimStatus(
            @PathVariable int id,
            @RequestParam String status) {
        return claimService.updateClaimStatus(id, status);
    }
}