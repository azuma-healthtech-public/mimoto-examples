package com.mimoto.example.gematikmock.tasks;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class DemoRequestData {
    private String url;

    @SerializedName("gematik_enable_testing")
    private Boolean gematikEnableTesting;

    @SerializedName("gematik_login_user")
    private String gematikLoginUser;

    @SerializedName("gematik_selected_scopes")
    private List<String> gematikSelectedScopes = null;

    @SerializedName("gematik_scope_decline_mode")
    private String gematikScopeDeclineMode = "RemoveClaims";

    @SerializedName("gematik_override_health_id")
    private String gematikOverrideHealthId = null;

    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean getGematikEnableTesting() {
        return gematikEnableTesting;
    }

    public void setGematikEnableTesting(Boolean gematikEnableTesting) {
        this.gematikEnableTesting = gematikEnableTesting;
    }

    public String getGematikLoginUser() {
        return gematikLoginUser;
    }

    public void setGematikLoginUser(String gematikLoginUser) {
        this.gematikLoginUser = gematikLoginUser;
    }

    public List<String> getGematikSelectedScopes() {
        return gematikSelectedScopes;
    }

    public void setGematikSelectedScopes(List<String> gematikSelectedScopes) {
        this.gematikSelectedScopes = gematikSelectedScopes;
    }

    public String getGematikScopeDeclineMode() {
        return gematikScopeDeclineMode;
    }

    public void setGematikScopeDeclineMode(String gematikScopeDeclineMode) {
        this.gematikScopeDeclineMode = gematikScopeDeclineMode;
    }

    public String getGematikOverrideHealthId() {
        return gematikOverrideHealthId;
    }

    public void setGematikOverrideHealthId(String gematikOverrideHealthId) {
        this.gematikOverrideHealthId = gematikOverrideHealthId;
    }
}
