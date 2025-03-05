package com.esprit.stage.Service;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class BadWordsFilterService {
    // Liste des mots interdits
    private static final List<String> BAD_WORDS = Arrays.asList("badword1", "badword2", "badword3");

    /**
     * Filtrer et remplacer les mots interdits par ***
     */
    public String filterBadWords(String text) {
        if (text == null || text.isEmpty()) {
            return text;
        }

        for (String badWord : BAD_WORDS) {
            String regex = "(?i)\\b" + Pattern.quote(badWord) + "\\b"; // Recherche exacte, insensible à la casse
            text = text.replaceAll(regex, "*******");
        }

        return text;
    }

    /**
     * Vérifier si un texte contient un mot interdit
     */
    public boolean containsBadWords(String text) {
        if (text == null || text.isEmpty()) {
            return false;
        }

        return BAD_WORDS.stream().anyMatch(word -> text.toLowerCase().contains(word.toLowerCase()));
    }
}
