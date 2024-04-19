<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Foundation\Application;

use App\Providers\MimotoProvider;
use App\Providers\MimotoValidationProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //$this->app->singleton(MimotoValidationProvider::class, function (Application $app) {
        //    return new MimotoValidationProvider();
        //});
    }

    private function bootProviderMimoto()
    {
        $socialite = $this->app->make('Laravel\Socialite\Contracts\Factory');
        $socialite->extend(
            'mimoto',
            function ($app) use ($socialite) {
                $config = $app['config']['services.mimoto'];
                $provider = $socialite->buildProvider(MimotoProvider::class, $config);

                return $provider;
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
