package com.appauthcodeexchange.tasks;

public class ExchangeRequestData {
    private String redirectUrl;
    private String clientId;
    public String getRedirectUrl() {
        return redirectUrl;
    }
    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }
}
