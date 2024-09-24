package com.game.infra.data.datasources;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.game.infra.data.models.PlayerModel;

@Repository
public interface JpaPlayerRepository extends JpaRepository<PlayerModel, Long> {
    @Query(value = "SELECT * FROM player WHERE websocket_id = ?1", nativeQuery = true)
    public List<PlayerModel> findByWebSocketId(String webSocketId);
}