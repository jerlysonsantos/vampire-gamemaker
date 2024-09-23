package com.game.domain.usecases.player;

import com.game.infra.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class RegisterPlayerUseCase {
  @Autowired
  private PlayerRepository playerRepository;

  public void execute() {
    return;
  }
}
