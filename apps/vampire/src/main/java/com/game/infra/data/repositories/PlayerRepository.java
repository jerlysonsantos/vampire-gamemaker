package com.game.infra.data.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.game.core.domain.Player;
import com.game.core.repositories.IPlayerRepository;
import com.game.infra.data.datasources.JpaPlayerRepository;
import com.game.infra.data.models.PlayerModel;
import com.game.infra.mappers.PlayerMapper;

@Repository
public class PlayerRepository implements IPlayerRepository {

    @Autowired
    private JpaPlayerRepository jpaPlayerRepository;

    public Player save(Player player) {
        PlayerModel playerModel = this.jpaPlayerRepository.save(PlayerMapper.toModel(player));

        return PlayerMapper.toEntity(playerModel);
    }

    public Player findById(Long id) {
        PlayerModel player = this.jpaPlayerRepository.findById(id).get();

        return PlayerMapper.toEntity(player);
    }

    public void delete(Player player) {
        PlayerModel playerModel = new PlayerModel(player.getId(), player.getUsername(), player.getPassword());

        this.jpaPlayerRepository.delete(playerModel);
    }

    public Player update(Player player) {
        PlayerModel playerModel = this.jpaPlayerRepository.save(PlayerMapper.toModel(player));

        return PlayerMapper.toEntity(playerModel);
    }

    public List<Player> findAll() {
        return PlayerMapper.toEntityList(this.jpaPlayerRepository.findAll());
    }

    public List<Player> findBySocketId(String webSocketId) {
        return PlayerMapper.toEntityList(this.jpaPlayerRepository.findByWebSocketId(webSocketId));
    }

}
