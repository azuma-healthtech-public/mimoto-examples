package com.mimoto.example.gematikmock;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;


public class RedirectUriReceiverActivity extends AppCompatActivity {

    public static String Data = "";

    @Override
    public void onCreate(Bundle savedInstanceBundle) {
        super.onCreate(savedInstanceBundle);

        // Extremely simple --> just for demonstration purposes
        Intent appLinkIntent = getIntent();
        Uri appLinkData = appLinkIntent.getData();

        RedirectUriReceiverActivity.Data = appLinkData.toString();

        Intent intent = new Intent(this, MainActivity.class);
        intent.setData(getIntent().getData());
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

        startActivity(intent);
        finish();
    }

}