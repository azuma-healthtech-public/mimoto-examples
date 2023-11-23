package com.mimoto.example.gematikmock.tasks;

import android.os.Handler;
import android.os.Looper;

import java.util.concurrent.Callable;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TaskRunner {
    private ExecutorService executor = Executors.newSingleThreadExecutor(); // change according to your requirements
    private final Handler handler = new Handler(Looper.getMainLooper());

    public interface Callback<R> {
        void onComplete(R result);
    }

    public void recreateIfShutDown() {
        if (executor.isShutdown())
            executor = Executors.newSingleThreadExecutor();
    }

    public void shutdown() {
        executor.shutdownNow();
    }

    public <R> void executeAsync(Callable<R> callable, Callback<R> callback) {
        executor.execute(() -> {
            try {
                final R result = callable.call();
                handler.post(() -> {
                    callback.onComplete(result);
                });
            }
            catch (Exception ex){
                throw new RuntimeException(ex);
            }
        });
    }
}
