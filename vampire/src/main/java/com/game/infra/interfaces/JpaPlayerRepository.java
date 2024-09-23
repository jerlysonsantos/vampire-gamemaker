package com.game.infra.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.game.core.domain.Player;

public interface JpaPlayerRepository extends JpaRepository<Player, Long> {

    @Query(value = "SELECT * FROM player WHERE websocket_id = ?1", nativeQuery = true)
    public List<Player> findByWebSocketId(String webSocketId);
}