package com.game.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.game")
@EnableJpaRepositories(basePackages = { "com.game.infra.data.datasources" })
@EntityScan(basePackages = { "com.game.infra.data.models" })
public class VampireApplication {

	public static void main(String[] args) {
		SpringApplication.run(VampireApplication.class, args);
	}

}
