package com.game.infra.repositories;

import org.springframework.stereotype.Repository;

import java.util.List;
import com.game.core.domain.Player;
import com.game.core.repositories.IPlayerRepository;
import com.game.infra.interfaces.JpaPlayerRepository;

@Repository
public class PlayerRepository implements IPlayerRepository {

    private final JpaPlayerRepository jpaPlayerRepository;

    public PlayerRepository(JpaPlayerRepository jpaPlayerRepository) {
        this.jpaPlayerRepository = jpaPlayerRepository;
    }

    @Override
    public void save(Player player) {
        this.jpaPlayerRepository.save(player);
        return;
    }

    @Override
    public Player findById(Long id) {
        return this.jpaPlayerRepository.findById(id).get();
    }

    @Override
    public void delete(Player player) {
        this.jpaPlayerRepository.delete(player);
        return;
    }

    @Override
    public void update(Player player) {
        this.jpaPlayerRepository.save(player);
        return;
    }

    @Override
    public List<Player> findAll() {
        return this.jpaPlayerRepository.findAll();
    }

    @Override
    public List<Player> findBySocketId(String webSocketId) {
        return this.jpaPlayerRepository.findByWebSocketId(webSocketId);
    }

}
