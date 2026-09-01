package com.productwarrenty.backend.service;
import com.productwarrenty.backend.model.Claim;
import com.productwarrenty.backend.repository.ClaimRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ClaimService {
    private final ClaimRepository claimRepository;
    public ClaimService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }
    public Claim addClaim(Claim claim) {
        return claimRepository.save(claim);
    }
    public List<Claim> getClaims() {
        return claimRepository.findAll();
    }
    public Claim updateClaimStatus(int id, String status) {
        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));
        claim.setStatus(status);
        return claimRepository.save(claim);
    }
}