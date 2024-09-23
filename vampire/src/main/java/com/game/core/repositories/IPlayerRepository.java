package com.game.core.repositories;

import java.util.List;
import com.game.core.domain.Player;

public interface IPlayerRepository {
    public void save(Player player);

    public Player findById(Long id);

    public void delete(Player player);

    public void update(Player player);

    public List<Player> findAll();

    public List<Player> findBySocketId(String webSocketId);
}
