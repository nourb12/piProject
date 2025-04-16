package com.esprit.stage.Controller;

import com.esprit.stage.Entities.InternshipOffer;
import com.esprit.stage.Entities.User;
import com.esprit.stage.Service.OffreService;
import com.esprit.stage.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/offres")
public class OffreController {
  @Autowired
  private OffreService offreService;

  @GetMapping
  public List<InternshipOffer> getAllOffres() {
    return offreService.getAllOffre();
  }

  @GetMapping("/{id}")
  public InternshipOffer getOffreById(@PathVariable Long id) {
    return offreService.getOffreById(id);
  }
}
