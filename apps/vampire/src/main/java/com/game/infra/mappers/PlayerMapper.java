package com.game.infra.mappers;

import java.util.ArrayList;
import java.util.List;

import com.game.core.domain.Player;
import com.game.infra.data.models.PlayerModel;

public class PlayerMapper {
    public static Player toEntity(PlayerModel playerModel) {
        Player player = new Player();
        player.setId(playerModel.getId());
        player.setUsername(playerModel.getUsername());
        player.setPassword(playerModel.getPassword());
        player.setCreatedAt(playerModel.getCreatedAt());
        player.setUpdatedAt(playerModel.getUpdatedAt());

        return player;

    }

    public static PlayerModel toModel(Player player) {
        PlayerModel playerModel = new PlayerModel();
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
