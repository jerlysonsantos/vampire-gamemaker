package com.game.core.usecasesimpl.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.game.core.domain.Player;
import com.game.core.repositories.IPlayerRepository;
import com.game.core.usecases.player.RegisterPlayerUseCase;

@Service
public class RegisterPlayerUseCaseImpl implements RegisterPlayerUseCase {

  @Autowired
  private IPlayerRepository playerRepository;

  @Override
  public void execute(Player player) {
    this.playerRepository.save(player);
  }
}
