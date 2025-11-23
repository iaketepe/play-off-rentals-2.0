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

        $token = $provider->getAccessToken('refresh_token', [
            'refresh_token' => env('GOOGLE_REFRESH_TOKEN'),
        ]);

        return $token->getToken();
    }
    
}

