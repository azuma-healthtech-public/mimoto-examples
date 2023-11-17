<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Providers\MimotoProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    private function bootProviderMimoto()
    {
        $socialite = $this->app->make('Laravel\Socialite\Contracts\Factory');
        $socialite->extend(
            'mimoto',
            function ($app) use ($socialite) {
                $config = $app['config']['services.mimoto'];
                return $socialite->buildProvider(MimotoProvider::class, $config);
            }
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->bootProviderMimoto();
    }
}
