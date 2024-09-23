package com.game.core.domain;

import java.util.Date;

import com.game.core.domain.Character.Character;

public class Player {
  private Long id;
  private String username;
  private String password;
  private Date created_at;
  private Date updated_at;

  private Character[] character;

  Player() {
  }

  public Player(Long id, String username, String password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  Player(Long id, String username, String password, Date created_at, Date updated_at) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public void setCharacter(Character[] character) {
    this.character = character;
  }

  public Character[] getCharacter() {
    return this.character;
  }

  public String toString() {
    return "Player{id=" + id + ", username=" + username + ", created_at=" + created_at
        + ", updated_at=" + updated_at + "}";
  }
}
