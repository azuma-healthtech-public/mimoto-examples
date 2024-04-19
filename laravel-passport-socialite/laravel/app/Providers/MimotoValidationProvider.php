<?php

namespace App\Providers;


use Firebase\JWT\JWT;
use Firebase\JWT\CachedKeySet;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\HttpFactory;
use Phpfastcache\CacheManager;

class MimotoValidationProvider 
{ 
    protected $keySet;
    
    public function __construct()
    {    
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

    public function validateAndDecodeMimotoToken($idToken){
        $user = [];

        JWT::$leeway = 5;
        JWT::decode($idToken, $this->keySet);
        
        // decode ID
        [, $payload_b64] = explode('.', $idToken);
        $decodedUrl = JWT::urlsafeB64Decode($payload_b64);
        
        $idTokenData = json_decode($decodedUrl, true);

        // map required claims
        $user["sub"] = $idTokenData["ext-mimoto-original-sub-unique"];
        $user["email"] = $idTokenData["urn:telematik:claims:email"];
        $user["kvnr"] = $idTokenData["urn:telematik:claims:id"];

        return $user;
    }
}