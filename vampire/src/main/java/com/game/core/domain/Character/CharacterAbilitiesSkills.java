package com.game.core.domain.Character;

public class CharacterAbilitiesSkills {
    private int id;
    private int animalKen;
    private int crafts;
    private int drive;
    private int etiquette;
    private int firearms;
    private int larceny;
    private int melee;
    private int performance;
    private int security;
    private int stealth;
    private int survival;

    public CharacterAbilitiesSkills() {
    }

    public CharacterAbilitiesSkills(int id, int animalKen, int crafts, int drive, int etiquette, int firearms,
            int larceny,
            int melee, int performance, int security, int stealth, int survival) {
        this.id = id;
        this.animalKen = animalKen;
        this.crafts = crafts;
        this.drive = drive;
        this.etiquette = etiquette;
        this.firearms = firearms;
        this.larceny = larceny;
        this.melee = melee;
        this.performance = performance;
        this.security = security;
        this.stealth = stealth;
        this.survival = survival;
    }
}
