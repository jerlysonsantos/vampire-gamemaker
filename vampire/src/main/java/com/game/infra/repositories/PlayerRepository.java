package com.game.infra.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.game.domain.entities.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}
