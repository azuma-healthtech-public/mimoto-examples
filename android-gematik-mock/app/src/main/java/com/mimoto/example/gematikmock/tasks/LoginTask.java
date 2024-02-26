package com.mimoto.example.gematikmock.tasks;

import android.util.Log;

import com.google.gson.Gson;
import com.mimoto.example.gematikmock.data.AvailableUser;

import java.util.concurrent.Callable;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class LoginTask implements Callable<String> {
    private final String targetUrl = "https://mimoto-test.pie.azuma-health.tech/api/demo/login";

    private DemoRequestData data;

    public LoginTask(DemoRequestData data){
        this.data = data;
    }

    @Override
    public String call() throws Exception {
        // Extremely simple --> just for demonstration purposes
        Log.e("[gematikmock]", "Executing demo login");
        Gson gson = new Gson();
        String json = gson.toJson(data);

        OkHttpClient client = new OkHttpClient().newBuilder().build();
        RequestBody body = RequestBody.create(json, MediaType.get("application/json"));
        Request request = new Request.Builder()
                .url(targetUrl)
                .post(body)
                .build();

        Response response = client.newCall(request).execute();

        String responseJson = response.body().string();
        DemoResponseData responseData = gson.fromJson(responseJson, DemoResponseData.class);

        Log.e("[gematikmock]", "Executed demo login");
        return responseData.getUrl();
    }
}
