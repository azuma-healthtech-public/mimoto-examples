package com.mimoto.example.gematikmock.tasks;

import android.util.Log;

import java.util.concurrent.Callable;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class LoginTask implements Callable<String> {
    public static final String AuthHeaderGematik = "AUTH_HEADER_FROM_GEMATIK"; // FIXME: adjust this

    private String authData;

    public LoginTask(String authData){
        this.authData = authData;
    }

    @Override
    public String call() throws Exception {
        // Extremely simple --> just for demonstration purposes

        Log.e("[gematikmock]", "Executing with following data:");
        Log.e("[gematikmock]", authData);

        // get original request
        String originalUrl = authData.replace("https://mimoto-gematik-mock.azuma-health.tech/idp/par?redirect=$", "");
        Log.e("[gematikmock]", "Original url:");
        Log.e("[gematikmock]", originalUrl);

        // login with gematik IDP
        String loginUrl = originalUrl.replace("https://gsi.dev.gematik.solutions/auth?", "https://gsi.dev.gematik.solutions/auth?user_id=12345678&");
        Log.e("[gematikmock]", "Login url:");
        Log.e("[gematikmock]", loginUrl);

        // login
        OkHttpClient client = new OkHttpClient().newBuilder()
                .followRedirects(false)
                .build();

        Request request = new Request.Builder().url(loginUrl)
                .addHeader("X-Authorization", AuthHeaderGematik).build();
        Response response = client.newCall(request).execute();

        String redirect = response.header("Location");
        Log.e("[gematikmock]", "Redirect back to:");
        Log.e("[gematikmock]", redirect);

        return redirect;
    }
}
