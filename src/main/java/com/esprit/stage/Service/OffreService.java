package com.esprit.stage.Service;

import com.esprit.stage.Entities.InternshipOffer;
import com.esprit.stage.Entities.User;
import com.esprit.stage.Repository.OffreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OffreService {
  @Autowired
  private OffreRepo offreRepo;

  public List<InternshipOffer> getAllOffre() {
    return offreRepo.findAll();
  }

  public InternshipOffer getOffreById(Long id) {
    return offreRepo.findById(id).get();
  }



}
