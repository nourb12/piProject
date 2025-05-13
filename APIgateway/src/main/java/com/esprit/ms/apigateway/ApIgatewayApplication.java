package com.esprit.ms.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class ApIgatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApIgatewayApplication.class, args);
    }

    @Bean
    public RouteLocator getrouteApiGateway(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("quiz",r->r.path("/quiz/api/**")
                        .uri("lb://Stage"))

                .route("projet",r -> r.path("/api/projects/**")
                                      .uri("lb://Project"))

                .route("reclamation",
                        r -> r.path("/api/complaints/**")
                                .uri("lb://reclamation"))
                .route("Meeting",
                        r -> r.path("/pi/pi/Meeting/**")
                                .uri("lb://Meeting"))
                .route("Meetings", r -> r.path("/pi/ws/**")
                        .uri("lb://Meeting"))
                .route("offer",
                        r -> r.path("/api/**")
                                .uri("lb://Offer"))
                .route("user",
                        r -> r.path("/user/api/auth/**")
                                .uri("lb://UserJwt"))
                .build();

    }


}
