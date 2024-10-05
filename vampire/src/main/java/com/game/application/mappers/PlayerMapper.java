package com.game.application.mappers;

import java.util.ArrayList;
import java.util.List;

import com.game.application.datatransferobjects.PlayerDTO;
import com.game.core.domain.Player;

public class PlayerMapper {
    public static Player toEntity(PlayerDTO playerDTO) {
        Player player = new Player();
        player.setId(playerDTO.getId());
        player.setUsername(playerDTO.getUsername());
        player.setPassword(playerDTO.getPassword());

        return player;

    }

    public static PlayerDTO toDTO(Player player) {
        PlayerDTO playerDTO = new PlayerDTO();
        playerDTO.setId(player.getId());
        playerDTO.setUsername(player.getUsername());
        playerDTO.setPassword(player.getPassword());
        playerDTO.setCreatedAt(player.getCreatedAt());
        playerDTO.setUpdatedAt(player.getUpdatedAt());

        return playerDTO;
    }

    public static List<Player> toEntityList(List<PlayerDTO> playerDTOList) {
        List<Player> playerList = new ArrayList<Player>();

        for (PlayerDTO playerDTO : playerDTOList) {
            playerList.add(PlayerMapper.toEntity(playerDTO));
        }

        return playerList;
    }
}
