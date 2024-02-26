package com.mimoto.example.gematikmock;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import android.text.TextUtils;
import android.view.View;


import com.mimoto.example.gematikmock.data.AvailableUser;
import com.mimoto.example.gematikmock.data.Constants;
import com.mimoto.example.gematikmock.databinding.ActivityMainBinding;
import com.mimoto.example.gematikmock.tasks.DemoRequestData;
import com.mimoto.example.gematikmock.tasks.LoginTask;
import com.mimoto.example.gematikmock.tasks.TaskRunner;

import android.view.Menu;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;
    private TaskRunner taskRunner;

    private AvailableUser authUser = Constants.AVAILABLE_USERS.get(Constants.DEFAULT_USER_INDEX);
    private boolean advancedParams = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        setSupportActionBar(binding.toolbar);

        taskRunner = new TaskRunner();

        // Very dirty, but sufficient for demo
        binding.loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                binding.progressIndicator.setVisibility(View.VISIBLE);
                binding.loginButton.setEnabled(false);

                DemoRequestData requestData = new DemoRequestData();
                requestData.setUrl(RedirectUriReceiverActivity.Data);
                requestData.setGematikEnableTesting(true);
                requestData.setGematikLoginUser(authUser.getHealthId());

                if( advancedParams){
                    List<String> scopes = new ArrayList<String>();
                    if( binding.scopeAlter.isChecked())
                        scopes.add("urn:telematik:alter");
                    if( binding.scopeDisplayName.isChecked())
                        scopes.add("urn:telematik:display_name");
                    if( binding.scopeEmail.isChecked())
                        scopes.add("urn:telematik:email");
                    if( binding.scopeGeburtsdatum.isChecked())
                        scopes.add("urn:telematik:geburtsdatum");
                    if( binding.scopeGeschlecht.isChecked())
                        scopes.add("urn:telematik:geschlecht");
                    if( binding.scopeVersicherter.isChecked())
                        scopes.add("urn:telematik:versicherter");
                    if( binding.scopeGivenName.isChecked())
                        scopes.add("urn:telematik:given_name");
                    if( binding.scopeOpenid.isChecked())
                        scopes.add("openid");

                    requestData.setGematikSelectedScopes(scopes);
                }

                requestData.setGematikScopeDeclineMode(binding.scopeDeclineSpinner.getSelectedItemPosition() == 0 ? "RemoveClaims": "AddEmptyClaims");
                requestData.setGematikOverrideHealthId(binding.textOverrideHealthId.getText().toString());

                taskRunner.executeAsync(new LoginTask(requestData), result -> {
                    Intent myIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(result));
                    startActivity(myIntent);

                    finish();
                });
            }
        });

        binding.showAdvancedButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                binding.showAdvancedButton.setVisibility(View.GONE);
                binding.advancedLayout.setVisibility(View.VISIBLE);
                advancedParams = true;
            }
        });

        // Set up users list
        ArrayAdapter<AvailableUser> usersAdapter = new ArrayAdapter<AvailableUser>(getApplicationContext(), android.R.layout.simple_spinner_item, 0, Constants.AVAILABLE_USERS);
        Spinner spinner = findViewById(R.id.users_spinner);
        spinner.setAdapter(usersAdapter);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                authUser = Constants.AVAILABLE_USERS.get(position);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        spinner.setSelection(Constants.DEFAULT_USER_INDEX);

        // Set decline scope modes
        ArrayAdapter<String> scopeDeclineAdapter = new ArrayAdapter<String>(getApplicationContext(), android.R.layout.simple_spinner_item, 0, Constants.AVAILABLE_SCOPE_DECLINES);
        Spinner scopeDeclineSpinner = findViewById(R.id.scope_decline_spinner);
        scopeDeclineSpinner.setAdapter(scopeDeclineAdapter);

    }

    @Override
    protected void onStart() {
        super.onStart();

        taskRunner.recreateIfShutDown();
    }

    @Override
    protected void onStop() {
        super.onStop();
        taskRunner.shutdown();
    }

    @Override
    public void onResume() {
        super.onResume();

        binding.loginButton.setEnabled(!TextUtils.isEmpty(RedirectUriReceiverActivity.Data));
        binding.textviewAuth.setText(TextUtils.isEmpty(RedirectUriReceiverActivity.Data) ? "-":RedirectUriReceiverActivity.Data);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }
}