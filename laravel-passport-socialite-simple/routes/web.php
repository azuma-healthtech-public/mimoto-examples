<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Ramsey\Uuid\Uuid;

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
 
Route::get('/login', function () {
    return Socialite::driver('mimoto')->stateless()->redirect();
});
 
Route::get('/login/callback', function () {
    $userSocial = Socialite::driver('mimoto')->stateless()->user();
    
    $user = User::where(['email' => $userSocial->getEmail()])->first();
    if($user) {

        Auth::login($user);
        return Redirect::to('/');
        
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
        return Redirect::to('/');

    }
});