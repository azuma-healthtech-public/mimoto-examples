package com.mimoto.example.gematikmock;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import android.text.TextUtils;
import android.view.View;


import com.mimoto.example.gematikmock.databinding.ActivityMainBinding;
import com.mimoto.example.gematikmock.tasks.LoginTask;
import com.mimoto.example.gematikmock.tasks.TaskRunner;

import android.view.Menu;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;
    private TaskRunner taskRunner;

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

                taskRunner.executeAsync(new LoginTask(RedirectUriReceiverActivity.Data), result -> {
                    Intent myIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(result));
                    startActivity(myIntent);

                    finish();
                });
            }
        });
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

        binding.loginButton.setEnabled(!TextUtils.isEmpty(RedirectUriReceiverActivity.Data) && LoginTask.AuthHeaderGematik != "AUTH_HEADER_FROM_GEMATIK");
        binding.textviewAuth.setText(TextUtils.isEmpty(RedirectUriReceiverActivity.Data) ? "-":RedirectUriReceiverActivity.Data);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }
}