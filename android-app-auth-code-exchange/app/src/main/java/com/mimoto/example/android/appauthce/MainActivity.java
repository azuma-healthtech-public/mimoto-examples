package com.mimoto.example.android.appauthce;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import android.view.View;


import com.mimoto.example.android.appauthce.databinding.ActivityMainBinding;

import android.view.Menu;

import net.openid.appauth.AuthorizationException;
import net.openid.appauth.AuthorizationRequest;
import net.openid.appauth.AuthorizationResponse;
import net.openid.appauth.AuthorizationService;
import net.openid.appauth.AuthorizationServiceConfiguration;
import net.openid.appauth.ClientAuthentication;
import net.openid.appauth.ResponseTypeValues;
import net.openid.appauth.TokenRequest;

public class MainActivity extends AppCompatActivity {
    private static final int RC_AUTH = 100;

    private ActivityMainBinding binding;
    private AuthorizationService authService;
    private AuthStateManager stateManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        setSupportActionBar(binding.toolbar);

        stateManager = AuthStateManager.getInstance(this);
        authService = new AuthorizationService(MainActivity.this);

        AuthorizationServiceConfiguration serviceConfig =
                new AuthorizationServiceConfiguration(
                        Uri.parse("https://mimoto-test.pie.azuma-health.tech/connect/auth"), // authorization endpoint
                        Uri.parse("https://mimoto-test.pie.azuma-health.tech/connect/token")); // token endpoint
        AuthorizationRequest.Builder authRequestBuilder =
                new AuthorizationRequest.Builder(
                        serviceConfig, // the authorization service configuration
                        "b664b9ab-1484-4228-b546-7b173a860f44", // the client ID, typically pre-registered and static
                        ResponseTypeValues.CODE, // the response_type value: we want a code
                        Uri.parse("https://mimoto-example-app.azuma-health.tech/app/ce")); // the redirect URI to which the auth response is sent
        binding.loginButton.setOnClickListener(v -> {
            binding.progressIndicator.setVisibility(View.VISIBLE);
            binding.loginButton.setVisibility(View.INVISIBLE);

            AuthorizationRequest authRequest = authRequestBuilder
                    .setScope("openid urn:telematik:versicherter urn:telematik:email")
                    .build();

            Intent authIntent = authService.getAuthorizationRequestIntent(authRequest);
            startActivityForResult(authIntent, RC_AUTH);
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_AUTH) {
            AuthorizationResponse response = AuthorizationResponse.fromIntent(data);
            AuthorizationException ex = AuthorizationException.fromIntent(data);

            if (response != null || ex != null) {
                stateManager.updateAfterAuthorization(response, ex);
            }

            // exchange auth code token for access/id tokens
            try {
                if( response == null ) {
                    binding.progressIndicator.setVisibility(View.INVISIBLE);
                    binding.loginButton.setVisibility(View.VISIBLE);
                    return;
                }


                TokenRequest request = response.createTokenExchangeRequest();
                authService.performTokenRequest(request, stateManager.getCurrent().getClientAuthentication(),
                        (tokenRes, tokenEx) -> {
                            stateManager.updateAfterTokenResponse(tokenRes, tokenEx);

                            Intent intent = new Intent(this, TokenActivity.class);
                            startActivity(intent);

                            finish();
                        }
                );
            } catch (ClientAuthentication.UnsupportedAuthenticationMethod unsupportedEx) {
               // ...
                // some error handling
            }

        } else {
            // ...
            // some error handling
            binding.progressIndicator.setVisibility(View.INVISIBLE);
            binding.loginButton.setVisibility(View.VISIBLE);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }
}