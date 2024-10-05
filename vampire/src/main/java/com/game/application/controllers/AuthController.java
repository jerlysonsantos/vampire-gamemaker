package com.game.application.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.game.application.datatransferobjects.PlayerDTO;
import com.game.application.mappers.PlayerMapper;
import com.game.core.domain.Player;
import com.game.core.usecases.player.RegisterPlayerUseCase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private RegisterPlayerUseCase registerPlayerUseCase;

  @PostMapping("/register")
  public ResponseEntity<PlayerDTO> register(@RequestBody PlayerDTO playerDTO) {
    Player player = PlayerMapper.toEntity(playerDTO);

    try {
      Player resultPlayer = this.registerPlayerUseCase.execute(player);

      return ResponseEntity.ok().body(PlayerMapper.toDTO(resultPlayer));
    } catch (Exception e) {
      return ResponseEntity.status(500).body(new PlayerDTO());
    }
  }
}
