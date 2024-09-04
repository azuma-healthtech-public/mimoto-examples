package com.mimoto.example.android.appauthce.tasks;

import android.util.Log;

import com.google.gson.Gson;
import com.mimoto.example.android.appauthce.Constants;

import java.util.concurrent.Callable;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ExchangeCodesTask implements Callable<String> {
    private String appLinkData;

    public ExchangeCodesTask(String appLinkData){
        this.appLinkData = appLinkData;
    }

    @Override
    public String call() throws Exception {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        Log.e("[code-exchange]", "Original url");
        Log.e("[code-exchange]", appLinkData.toString());

        Gson gson = new Gson();
        ExchangeRequestData requestData = new ExchangeRequestData();
        requestData.setClientId(Constants.ClientId);
        requestData.setRedirectUrl(appLinkData.toString());
        String json = gson.toJson(requestData);

        RequestBody body = RequestBody.create(json, MediaType.get("application/json"));
        Request request = new Request.Builder()
                .url(Constants.ExchangeUrl)
                .post(body)
                .build();

        Response response = client.newCall(request).execute();

        String responseJson = response.body().string();
        ExchangeResponseData responseData = gson.fromJson(responseJson, ExchangeResponseData.class);

        Log.e("[code-exchange]", "Redirect url");
        Log.e("[code-exchange]", responseJson);
        Log.e("[code-exchange]", responseData.getRedirectUrl());
        return responseData.getRedirectUrl();
    }
}
