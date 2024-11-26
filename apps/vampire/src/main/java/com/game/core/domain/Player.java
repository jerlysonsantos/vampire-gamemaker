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

  public Player() {
  }

  public Player(Long id, String username, String password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  public Player(Long id, String username, String password, Date created_at, Date updated_at) {
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

  public String getUsername() {
    return this.username;
  }

  public Long getId() {
    return this.id;
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

  public String toString() {
    return "Player{id=" + id + ", username=" + username + ", created_at=" + created_at
        + ", updated_at=" + updated_at + "}";
  }
}
