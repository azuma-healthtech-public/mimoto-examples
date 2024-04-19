# Example for laravel 

This example include 2 very simple sub-examples:

(1) Web-Web flow: Login is possible by starting backend and going to http://localhost:4555/login

(2) App-App flow: Login is possible from the flutter app via token-exchange in http://localhost:4555/token/exchange

## Executing examples

(1) Web-Web flow: 
- Start Backend: ```php artisan serve --port=4555```
- Go to http://localhost:4555 and click on Login


(2) App-App flow: Open flutter app and click on "Login with Gesundheits-ID"
- Start Backend: ```php artisan serve --port=4555 --host 0.0.0.0```
- Modify local IP in App project in constants.dart (BackendConstants.url)
- Start App: ```npm run```

