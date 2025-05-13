package com.esprit.stage.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // ✅ CORS Configuration


    // ✅ Static resource handler for PDF access
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Définit le chemin absolu vers le dossier

            String uploadPath = System.getProperty("user.dir") + "/uploaded-files/";
            registry.addResourceHandler("/files/**")
                    .addResourceLocations("file:" + uploadPath);
        }
}