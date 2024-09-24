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

    public static PlayerDTO toModel(Player player) {
        PlayerDTO playerModel = new PlayerDTO();
        playerModel.setId(player.getId());
        playerModel.setUsername(player.getUsername());
        playerModel.setPassword(player.getPassword());
        playerModel.setCreatedAt(player.getCreatedAt());
        playerModel.setUpdatedAt(player.getUpdatedAt());

        return playerModel;
    }

    public static List<Player> toEntityList(List<PlayerModel> playerModelList) {
        List<Player> playerList = new ArrayList<Player>();

        for (PlayerModel playerModel : playerModelList) {
            playerList.add(PlayerMapper.toEntity(playerModel));
        }

        return playerList;
    }
}
