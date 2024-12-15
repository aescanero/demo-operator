package com.disasterproject.operator.model;

public class DemoAgentSpec {
    private String image;
    private int port;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }
}
