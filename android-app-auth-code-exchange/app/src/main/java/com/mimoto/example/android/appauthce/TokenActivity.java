package com.mimoto.example.android.appauthce;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.mimoto.example.android.appauthce.databinding.ActivityTokenBinding;

import net.openid.appauth.IdToken;


public class TokenActivity extends AppCompatActivity {
    private ActivityTokenBinding binding;
    private AuthStateManager stateManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_token);
        binding = ActivityTokenBinding.inflate(getLayoutInflater());

        stateManager = AuthStateManager.getInstance(this);
    }

    protected void onResume() {
        super.onResume();

        Log.e("[token]", "Resumed");
        String email = "";

        IdToken parsedIdToken = stateManager.getCurrent().getParsedIdToken();
        if( parsedIdToken != null && parsedIdToken.additionalClaims != null)
            if( parsedIdToken.additionalClaims.get("urn:telematik:claims:email") != null)
                email = parsedIdToken.additionalClaims.get("urn:telematik:claims:email").toString();

        ((TextView)findViewById(R.id.textview_welcome)).setText("Welcome: " + email);
        ((TextView)findViewById(R.id.textview_at)).setText(stateManager.getCurrent().getAccessToken());
        ((TextView)findViewById(R.id.textview_id)).setText(stateManager.getCurrent().getIdToken());
    }
}