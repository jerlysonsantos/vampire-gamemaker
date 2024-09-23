package com.game.core.domain.Character;

public class CharacterAttributes {
    private int id;
    private int strength;
    private int dexterity;
    private int stamina;
    private int charisma;
    private int manipulation;
    private int appearance;
    private int perception;
    private int intelligence;
    private int wits;

    public CharacterAttributes() {
    }

    public CharacterAttributes(int id, int strength, int dexterity, int stamina, int charisma, int manipulation,
            int appearance, int perception, int intelligence, int wits) {
        this.id = id;
        this.strength = strength;
        this.dexterity = dexterity;
        this.stamina = stamina;
        this.charisma = charisma;
        this.manipulation = manipulation;
        this.appearance = appearance;
        this.perception = perception;
        this.intelligence = intelligence;
        this.wits = wits;
    }
}
