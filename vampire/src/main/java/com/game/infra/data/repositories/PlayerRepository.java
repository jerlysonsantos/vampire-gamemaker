package com.game.infra.data.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.game.core.domain.Player;
import com.game.core.repositories.IPlayerRepository;
import com.game.infra.data.datasources.JpaPlayerRepository;
import com.game.infra.data.models.PlayerModel;

@Repository
public class PlayerRepository implements IPlayerRepository {

    @Autowired
    private JpaPlayerRepository jpaPlayerRepository;

    @Override
    public Player save(Player player) {
        PlayerModel playerModel = new PlayerModel();

        return this.jpaPlayerRepository.save(playerModel.toModel(player)).toEntity();
    }

    @Override
    public Player findById(Long id) {
        return this.jpaPlayerRepository.findById(id).get().toEntity();
    }

    @Override
    public void delete(Player player) {
        PlayerModel playerModel = new PlayerModel(player.getId(), player.getUsername(), player.getPassword());

        this.jpaPlayerRepository.delete(playerModel);
    }

    @Override
    public Player update(Player player) {
        PlayerModel playerModel = new PlayerModel(player.getId(), player.getUsername(), player.getPassword());

        return this.jpaPlayerRepository.save(playerModel).toEntity();
    }

    @Override
    public List<Player> findAll() {
        PlayerModel playerModel = new PlayerModel();

        return playerModel.toEntityList(this.jpaPlayerRepository.findAll());
    }

    @Override
    public List<Player> findBySocketId(String webSocketId) {
        PlayerModel playerModel = new PlayerModel();

        return playerModel.toEntityList(this.jpaPlayerRepository.findByWebSocketId(webSocketId));
    }

}
