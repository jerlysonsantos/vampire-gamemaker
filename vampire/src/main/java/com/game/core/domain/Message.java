package com.game.core.domain;

public class Message {
    private int id;
    private String content;
    private boolean readed;
    private boolean favorite;
    private int characterId;

    Message() {
    }

    public Message(int id, String content, int characterId, boolean readed, boolean favorite) {
        this.id = id;
        this.content = content;
        this.characterId = characterId;
        this.readed = readed || false;
        this.favorite = favorite || false;
    }

    public String toString() {
        return "Message{id=" + id + ", content=" + content + ", characterId=" + characterId + ", readed=" + readed
                + ", favorite=" + favorite + "}";
    }
}
