package com.game.core.domain.Character;

import com.game.core.domain.Player;
import com.game.types.enums.Clan;
import java.util.Date;

public class Character {
    private Long id;
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

    public Character(Long id, String name, String chronicle, String nature, String demeanor, Clan clan, int generation,
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setChronicle(String chronicle) {
        this.chronicle = chronicle;
    }

    public void setNature(String nature) {
        this.nature = nature;
    }

    public void setDemeanor(String demeanor) {
        this.demeanor = demeanor;
    }

    public void setClan(Clan clan) {
        this.clan = clan;
    }

    public void setGeneration(int generation) {
        this.generation = generation;
    }

    public void setSire(String sire) {
        this.sire = sire;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }

    public void setWebsocketId(String websocketId) {
        this.websocketId = websocketId;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getId() {
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