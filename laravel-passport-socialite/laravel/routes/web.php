<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Laravel\Passport\AuthCode;
use Ramsey\Uuid\Uuid;
use App\Providers\MimotoValidationProvider;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// The idea of the token exchange is to provide the ID-token received from mimoto and exchange it for a valid access token.
// This includes
// (1) validating the ID token (JWKS and/or introspection)
// (2) validating if all required claims are present
// (3) checking if user already exists (e.g. if email is primary claim, it makes sense to check if non-health-id user is already present. In this case, only linking is possible after user logs in with existing account)
// (4) create new users 
// (5) login and issue token
Route::post('/token/exchange', function (Request $request, MimotoValidationProvider $validationProvider) {
    $content = Request::all();
    $idToken = $content["idToken"];

    // (1)
    $mimotoUser = $validationProvider->validateAndDecodeMimotoToken($idToken);
    // TODO: deal with expired tokens etc...
    // TODO: mimoto provides an introspection endpoint as well, this should be used as fallback to JWKS validation
    // https://docs.azuma-health.tech/products/mimoto/#token-introspection

    // (2)
    // TODO: check of required claims etc..

    // (3)
    $user = User::where(['health_id_sub' => $mimotoUser['sub']])->first();
    if($user) {
        // TODO: update claims if required etc..
        $user->fill([
            'health_id_kvnr' => $mimotoUser['kvnr']
        ]);
        $user->save();
    } else {
        // register new user if possible
        // TODO: Should first check if user already exists by email, if yes, show generic hint that login with existing account is required (if one exists)

        // (4)
        $randomUserPw = Uuid::uuid4();
        $user = User::create([
            'name' => " ",
            'email'         => $mimotoUser['email'],
            'health_id_sub'   => $mimotoUser['sub'],
            'health_id_kvnr'   => $mimotoUser['kvnr'],
            'password'      => $randomUserPw->toString()  // this highly depends on how you want to handle password / allow logins after oidc register with normal user/pw or not
        ]);
    }

    // (5)
    Auth::login($user);

    $token  = $user->createToken('UserToken', ['*']);
    return $token->plainTextToken;

})->name('tokenExchange');


Route::get('/login', function () {
    return Socialite::driver('mimoto')->redirect();
})->name('login');

Route::get('/login/callback', function () {
    $userSocial = Socialite::driver('mimoto')->user();
    $user = User::where(['email' => $userSocial->getEmail()])->first();
    if($user) {

        Auth::login($user);
        return Redirect::intended();

    } else {
        $randomUserPw = Uuid::uuid4();
        $user = User::create([
            'name'          => $userSocial->getName(),
            'email'         => $userSocial->getEmail(),
            'provider_id'   => $userSocial->getId(),
            'provider'      => "mimoto",
            'password'      => $randomUserPw->toString()  // this highly depends on how you want to handle password / allow logins after oidc register with normal user/pw or not
        ]);

        Auth::login($user);
        return Redirect::intended();

    }
});

Route::get('/user', function(Request $request) {
    return Auth::user();
})->middleware('auth:sanctum');