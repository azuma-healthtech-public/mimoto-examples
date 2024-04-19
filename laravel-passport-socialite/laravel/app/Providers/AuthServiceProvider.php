<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use App\Services\Auth\JwtGuard;
use Illuminate\Support\Facades\Auth;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Passport::tokensExpireIn(now()->addMinutes(5));
        Passport::refreshTokensExpireIn(now()->addDays(10));
        Passport::tokensCan([
            'openid' => 'Default openid scope',
        ]);

        Auth::extend('jwt', function ($app, $name, array $config) {
            // Return an instance of Illuminate\Contracts\Auth\Guard...
 
            return new JwtGuard(Auth::createUserProvider($config['provider']));
        });
    }
    
}
