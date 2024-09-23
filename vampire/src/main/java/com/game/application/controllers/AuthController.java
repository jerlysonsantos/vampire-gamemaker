package com.game.application.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.game.core.usecases.player.RegisterPlayerUseCase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private RegisterPlayerUseCase registerPlayerUseCase;

  @PostMapping("/register")
  public String register() {
    return "login";
  }
}
