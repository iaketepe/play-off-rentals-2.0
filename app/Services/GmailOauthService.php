<?php

namespace App\Services;

use League\OAuth2\Client\Provider\Google;

class GmailOauthService
{

    function getGmailAccessToken() {
        $provider = new Google([
            'clientId'     => env('GOOGLE_CLIENT_ID'),
            'clientSecret' => env('GOOGLE_CLIENT_SECRET'),
        ]);

        $refreshToken = env('GOOGLE_REFRESH_TOKEN');

        if(env('APP_ENV') === 'local') {
            $refreshToken = env('GOOGLE_REFRESH_LOCAL_TOKEN');
        }

        $token = $provider->getAccessToken('refresh_token', [
            'refresh_token' => $refreshToken,
        ]);

        return $token->getToken();
    }
    
}

