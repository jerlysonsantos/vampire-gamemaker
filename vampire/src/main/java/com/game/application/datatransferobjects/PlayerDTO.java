package com.game.application.datatransferobjects;

import java.util.Date;

public class PlayerDTO {
        Long id;
        String username;
        String password;
        Date createdAt;
        Date updatedAt;

        public PlayerDTO() {

        }

        public PlayerDTO(String username, String password) {
                this.username = username;
                this.password = password;
        }

        public String getPassword() {
                return password;
        }

        public Long getId() {
                return id;
        }

        public String getUsername() {
                return username;
        }

        public Date getCreatedAt() {
                return createdAt;
        }

        public Date getUpdatedAt() {
                return updatedAt;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public void setPassword(String password) {
                this.password = password;
        }

        public void setUsername(String username) {
                this.username = username;
        }

        public void setCreatedAt(Date createdAt) {
                this.createdAt = createdAt;
        }

        public void setUpdatedAt(Date updatedAt) {
                this.updatedAt = updatedAt;
        }

}
