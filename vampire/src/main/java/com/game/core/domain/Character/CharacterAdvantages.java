package com.game.core.domain.Character;

public class CharacterAdvantages {
    private int id;
    private String[] disciplines;
    private String[] backgrounds;
    private String[] virtues;

    public CharacterAdvantages() {
    }

    public CharacterAdvantages(int id, String[] disciplines, String[] backgrounds, String[] virtues) {
        this.id = id;
        this.disciplines = disciplines;
        this.backgrounds = backgrounds;
        this.virtues = virtues;
    }
}
