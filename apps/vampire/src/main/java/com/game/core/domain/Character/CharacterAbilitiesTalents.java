package com.game.core.domain.Character;

public class CharacterAbilitiesTalents {
    private int id;
    private int alertness;
    private int athletics;
    private int brawl;
    private int dodge;
    private int empathy;
    private int expression;
    private int intimidation;
    private int leadership;
    private int streetwise;
    private int subterfuge;

    public CharacterAbilitiesTalents() {
    }

    public CharacterAbilitiesTalents(int id, int alertness, int athletics, int brawl, int dodge, int empathy,
            int expression, int intimidation, int leadership, int streetwise, int subterfuge) {
        this.id = id;
        this.alertness = alertness;
        this.athletics = athletics;
        this.brawl = brawl;
        this.dodge = dodge;
        this.empathy = empathy;
        this.expression = expression;
        this.intimidation = intimidation;
        this.leadership = leadership;
        this.streetwise = streetwise;
        this.subterfuge = subterfuge;
    }
}