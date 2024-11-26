package com.game.infra.data.models;

import java.util.Date;

import com.game.core.domain.Character.Character;
import com.game.types.enums.Clan;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "characters")
public class CharacterModel {
    @Id
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

    public CharacterModel() {
    }

    public Character toEntity() {
        Character character = new Character();
        character.setId(this.id);
        character.setName(this.name);
        character.setChronicle(this.chronicle);
        character.setNature(this.nature);
        character.setDemeanor(this.demeanor);
        character.setClan(this.clan);
        character.setGeneration(this.generation);
        character.setSire(this.sire);
        character.setExperience(this.experience);
        character.setPlayerId(this.playerId);
        character.setWebsocketId(this.websocketId);
        character.setCreatedAt(this.createdAt);
        character.setUpdatedAt(this.updatedAt);

        return character;
    }
}
