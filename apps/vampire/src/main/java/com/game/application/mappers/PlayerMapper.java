package com.game.application.mappers;

import com.game.application.datatransferobjects.PlayerDTO;
import com.game.core.domain.Player;

public class PlayerMapper {
    public static Player toEntity(PlayerDTO playerDTO) {
        Player player = new Player();
        player.setId(playerDTO.id());
        player.setUsername(playerDTO.username());
        player.setPassword(playerDTO.password());

        return player;

    }

    public static PlayerDTO toDto(Player player) {
        PlayerDTO playerModel = new PlayerDTO(player.getId(),
                player.getUsername(),
                player.getPassword());

        return playerModel;
    }
}
