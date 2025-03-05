package com.esprit.stage.Controller;

import com.esprit.stage.Service.StatistiqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "http://localhost:4200")
public class StatistiqueController {

    @Autowired
    private StatistiqueService statistiqueService;

    // Endpoint to get average global rating
    @GetMapping("/moyenne-note")
    public Double getMoyenneNoteGlobale() {
        return statistiqueService.getMoyenneNoteGlobale();
    }

    // Endpoint to get average quality of supervision
    @GetMapping("/moyenne-qualite")
    public Double getMoyenneQualiteEncadrement() {
        return statistiqueService.getMoyenneQualiteEncadrement();
    }

    // Endpoint to get average work atmosphere
    @GetMapping("/moyenne-ambiance")
    public Double getMoyenneAmbianceTravail() {
        return statistiqueService.getMoyenneAmbianceTravail();
    }

    // Endpoint to get total number of complaints
    @GetMapping("/total-complaints")
    public Long getTotalComplaints() {
        return statistiqueService.getTotalComplaints();
    }

    // Endpoint to get workload distribution
    @GetMapping("/charge-travail")
    public List<Object[]> getRepartitionChargeTravail() {
        return statistiqueService.getRepartitionChargeTravail();
    }

    // Endpoint to get complaints distribution
    @GetMapping("/repartition-plaintes")
    public List<Object[]> getRepartitionPlaintes() {
        return statistiqueService.getRepartitionPlaintes();
    }

    // Endpoint to get comment distribution


    // Endpoint to get detail distribution
    @GetMapping("/repartition-details")
    public List<Object[]> getRepartitionDetails() {
        return statistiqueService.getRepartitionDetails();
    }
}
