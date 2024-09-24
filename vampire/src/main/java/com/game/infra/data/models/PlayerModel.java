package com.game.infra.data.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.game.core.domain.Player;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "players")
public class PlayerModel {

  @Id
  @GeneratedValue
  private Long id;

  private String username;
  private String password;
  private Date created_at;
  private Date updated_at;

  @OneToMany
  private CharacterModel[] character;

  public PlayerModel() {
  }

  public PlayerModel(Long id, String username, String password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  public PlayerModel(Long id, String username, String password, Date created_at, Date updated_at) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setCreatedAt(Date created_at) {
    this.created_at = created_at;
  }

  public void setUpdatedAt(Date updated_at) {
    this.updated_at = updated_at;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setCharacter(CharacterModel[] character) {
    this.character = character;
  }

  public CharacterModel[] getCharacter() {
    return this.character;
  }

  public String getUsername() {
    return this.username;
  }

  public String getPassword() {
    return this.password;
  }

  public Date getCreatedAt() {
    return this.created_at;
  }

  public Date getUpdatedAt() {
    return this.updated_at;
  }

  public Long getId() {
    return this.id;
  }

  public Player toEntity() {
    Player player = new Player();
    player.setId(this.id);
    player.setUsername(this.username);
    player.setPassword(this.password);
    player.setCreatedAt(this.created_at);
    player.setUpdatedAt(this.updated_at);

    return player;

  }

  public PlayerModel toModel(Player player) {
    PlayerModel playerModel = new PlayerModel();
    playerModel.setId(player.getId());
    playerModel.setUsername(player.getUsername());
    playerModel.setPassword(player.getPassword());
    playerModel.setCreatedAt(player.getCreatedAt());
    playerModel.setUpdatedAt(player.getUpdatedAt());

    return playerModel;
  }

  public List<Player> toEntityList(List<PlayerModel> playerModelList) {
    List<Player> playerList = new ArrayList<Player>();

    for (PlayerModel playerModel : playerModelList) {
      playerList.add(playerModel.toEntity());
    }

    return playerList;
  }

  public String toString() {
    return "Player{id=" + id + ", username=" + username + ", created_at=" + created_at
        + ", updated_at=" + updated_at + "}";
  }
}
