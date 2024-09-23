package com.game.core.domain.Character;

import com.game.core.domain.Player;
import com.game.types.enums.Clan;
import java.util.Date;

public class Character {
    private int id;
    private String name;
    private String chronicle;
    private String nature;
    private String demeanor;
    private Clan clan;
    private int generation;
    private String sire;
    private int experience;
    private int playerId;
    private String websocketId;
    private Date createdAt;
    private Date updatedAt;

    private Player player;

    public Character() {
    }

    public Character(int id, String name, String chronicle, String nature, String demeanor, Clan clan, int generation,
            String sire, int experience, int playerId, String websocketId, Date createdAt, Date updatedAt) {
        this.id = id;
        this.name = name;
        this.chronicle = chronicle;
        this.nature = nature;
        this.demeanor = demeanor;
        this.clan = clan;
        this.generation = generation;
        this.sire = sire;
        this.experience = experience;
        this.playerId = playerId;
        this.websocketId = websocketId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getChronicle() {
        return this.chronicle;
    }

    public String getNature() {
        return this.nature;
    }

    public String getDemeanor() {
        return this.demeanor;
    }

    public Clan getClan() {
        return this.clan;
    }

    public int getGeneration() {
        return this.generation;
    }

    public String getSire() {
        return this.sire;
    }

    public int getExperience() {
        return this.experience;
    }

    public int getPlayerId() {
        return this.playerId;
    }

    public String getWebsocketId() {
        return this.websocketId;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public Date getUpdatedAt() {
        return this.updatedAt;
    }

    public Player getPlayer() {
        return this.player;
    }

    public String toString() {
        return "Character(id=" + this.getId() + ", name=" + this.getName() + ", chronicle=" + this.getChronicle()
                + ", nature=" + this.getNature() + ", demeanor=" + this.getDemeanor() + ", clan=" + this.getClan()
                + ", generation=" + this.getGeneration() + ", sire=" + this.getSire() + ", experience="
                + this.getExperience() + ", playerId=" + this.getPlayerId() + ", websocketId=" + this.getWebsocketId()
                + ", createdAt=" + this.getCreatedAt() + ", updatedAt=" + this.getUpdatedAt() + ")";
    }
}