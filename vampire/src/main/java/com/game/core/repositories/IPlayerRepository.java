package com.game.core.repositories;

import java.util.List;
import com.game.core.domain.Player;

public interface IPlayerRepository {
    public Player save(Player player);

    public Player findById(Long id);

    public void delete(Player player);

    public Player update(Player player);

    public List<Player> findAll();

    public List<Player> findBySocketId(String webSocketId);
}
