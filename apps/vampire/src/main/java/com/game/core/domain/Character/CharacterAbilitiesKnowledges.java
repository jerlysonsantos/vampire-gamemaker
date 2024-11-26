package com.game.core.domain.Character;

public class CharacterAbilitiesKnowledges {
    private int id;
    private int computer;
    private int finance;
    private int investigation;
    private int law;
    private int linguistics;
    private int medicine;
    private int occult;
    private int politics;
    private int science;
    private int academics;

    public CharacterAbilitiesKnowledges() {
    }

    public CharacterAbilitiesKnowledges(int id, int computer, int finance, int investigation, int law, int linguistics,
            int medicine, int occult, int politics, int science, int academics) {
        this.id = id;
        this.computer = computer;
        this.finance = finance;
        this.investigation = investigation;
        this.law = law;
        this.linguistics = linguistics;
        this.medicine = medicine;
        this.occult = occult;
        this.politics = politics;
        this.science = science;
        this.academics = academics;
    }
}
