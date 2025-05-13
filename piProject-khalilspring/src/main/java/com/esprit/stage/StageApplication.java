package com.esprit.stage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class StageApplication {

	public static void main(String[] args) {
		SpringApplication.run(StageApplication.class, args);
	}

}
