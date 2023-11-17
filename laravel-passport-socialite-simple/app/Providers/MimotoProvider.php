<?php

namespace App\Providers;


use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\ProviderInterface;
use Laravel\Socialite\Two\User;

use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Firebase\JWT\CachedKeySet;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\HttpFactory;
use Phpfastcache\CacheManager;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class MimotoProvider extends AbstractProvider implements ProviderInterface
{ 
    protected $keySet;
    public function __construct(Request $request, $clientId, $clientSecret, $redirectUrl, $guzzle = [])
    {    
        parent::__construct($request, $clientId, $clientSecret, $redirectUrl, $guzzle);

        // see https://gitlab.grnet.gr/gavgeris/howto-moodle/-/blob/MOODLE_401_STABLE/lib/php-jwt/README.md
        $jwksUri = 'https://mimoto-test.pie.azuma-health.tech/.well-known/jwks';
        $httpClient = new Client();
        $httpFactory = new HttpFactory();
        $cacheItemPool = CacheManager::getInstance('files');

        $this->keySet = new CachedKeySet(
            $jwksUri, $httpClient, $httpFactory, $cacheItemPool, 
            null, // $expiresAfter int seconds to set the JWKS to expire 
            true  // $rateLimit    true to enable rate limit of 10 RPS on lookup of invalid keys
        );
    }

    /**
     * {@inheritdoc}
     */
    protected function getAuthUrl($state)
    {
        return $this->buildAuthUrlFromBase('https://mimoto-test.pie.azuma-health.tech/connect/auth', $state);
    }

    /**
     * {@inheritdoc}
     */
    protected function getTokenUrl()
    {
        return 'https://mimoto-test.pie.azuma-health.tech/connect/token';
    }

    protected function formatScopes(array $scopes, $scopeSeparator)
    {
        return "urn:telematik:alter urn:telematik:display_name urn:telematik:email urn:telematik:geschlecht urn:telematik:geburtsdatum urn:telematik:given_name urn:telematik:versicherter openid";
    }

    protected  function getUserByToken($token)
    {
       return []; // we can not query user by AT, as we dont store anything in mimoto after tokens are created
    }

    protected function userInstance(array $response, array $user){
        // The URI for the JWKS you wish to cache the results from

        $accessToken = Arr::get($response, 'access_token');
        $idToken = Arr::get($response, 'id_token');

        // Optional, if AT is used later, it should be verified
        // $decodedAt = JWT::decode($accessToken, $this->keySet);
        
        // Verify ID token
        // verification works, but json can not be mapped to php object for some reason ?!
        JWT::decode($idToken, $this->keySet);
        
        // decode ID
        [, $payload_b64] = explode('.', $idToken);
        $decodedUrl = JWT::urlsafeB64Decode($payload_b64);
        
        $idTokenData = json_decode($decodedUrl, true);

        // map required claims
        $user["id"] = $idTokenData["sub"];
        $user["email"] = $idTokenData["urn:telematik:claims:email"];
        $user["display_name"] = $idTokenData["urn:telematik:claims:display_name"];

        return parent::userInstance($response, $user);
    }

    
    /**
     * {@inheritdoc}
     */
    protected function mapUserToObject(array $user)
    {
        return (new User)->setRaw($user)->map([
            'id'       => $user['id'],
            'nickname' => $user['display_name'],
            'name'     => $user['display_name'],
            'email'    => $user['email']
        ]);
    }

}