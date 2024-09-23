package com.game.core.domain;

import java.util.Date;

public class Item {
    private int id;
    private String name;
    private String description;
    private Date createdAt;
    private int characterId;

    Item() {
    }

    public Item(int id, String name, String description, int characterId, Date createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.characterId = characterId;
        this.createdAt = createdAt;
    }

    public String toString() {
        return "Item{id=" + id + ", name=" + name + ", description=" + description + ", characterId=" + characterId
                + ", createdAt=" + createdAt + "}";
    }
}