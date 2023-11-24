package com.mimoto.example.android.appauthce;

import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import com.mimoto.example.android.appauthce.databinding.ActivityCodeExchangeBinding;
import com.mimoto.example.android.appauthce.tasks.ExchangeCodesTask;
import com.mimoto.example.android.appauthce.tasks.TaskRunner;

import net.openid.appauth.AuthorizationManagementActivity;


public class CodeExchangeActivity extends AppCompatActivity {
    private ActivityCodeExchangeBinding binding;
    private TaskRunner taskRunner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_code_exchange);
        binding = ActivityCodeExchangeBinding.inflate(getLayoutInflater());

        taskRunner = new TaskRunner();
    }

    @Override
    protected void onStart() {
        super.onStart();

        taskRunner.recreateIfShutDown();
    }

    @Override
    protected void onResume() {
        super.onResume();

        Log.e("[code-exchange]", "Resumed");
        if (getIntent().getData() != null) {
            Log.e("[code-exchange]", "Starting exchange");
            // exchange codes and continue auth code flow
            taskRunner.executeAsync(new ExchangeCodesTask(getIntent().getData().toString()), result -> {
                startActivity(AuthorizationManagementActivity.createResponseHandlingIntent(
                        CodeExchangeActivity.this, Uri.parse(result)));
                finish();
            });
        }
    }

    @Override
    protected void onStop() {
        super.onStop();
        taskRunner.shutdown();
    }
}