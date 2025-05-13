package com.ms.candidat.userjwt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class UserJwtApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserJwtApplication.class, args);
    }

}
