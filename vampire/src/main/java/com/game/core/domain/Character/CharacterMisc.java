package com.game.core.domain.Character;

public class CharacterMisc {
    private int id;
    private int humanity;
    private int willpower;
    private int bloodPool;
    private String path;

    public CharacterMisc() {
    }

    public CharacterMisc(int id, int humanity, int willpower, int bloodPool, String path) {
        this.id = id;
        this.humanity = humanity;
        this.willpower = willpower;
        this.bloodPool = bloodPool;
        this.path = path;
    }
}
