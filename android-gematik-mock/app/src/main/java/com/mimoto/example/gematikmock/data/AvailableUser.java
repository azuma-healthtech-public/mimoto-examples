package com.mimoto.example.gematikmock.data;

import androidx.annotation.NonNull;

public class AvailableUser {
    private String name;
    private String healthId;

    public AvailableUser(String name, String healthId){
        setName(name);
        setHealthId(healthId);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHealthId() {
        return healthId;
    }

    public void setHealthId(String healthId) {
        this.healthId = healthId;
    }


    @NonNull
    @Override
    public String toString() {
        return name + " (" + healthId + ")";
    }
}
