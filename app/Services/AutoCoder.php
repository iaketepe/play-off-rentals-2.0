<?php

namespace App\Services;

use Illuminate\Support\Facades\Http; 

use Exception;

class AutoCoder {
    private String $async;
    private String $crossDomain;
    private String $url;
    private String $apiKey;

    public function __construct() {
        try{
            //$this->async = env('AUTOCODER_ASYNC');
            //$this->crossDomain = env('AUTOCODER_CROSSDOMAIN');
            $this->url = env('AUTOCODER_URL');
            $this->apiKey = env('AUTOCODER_APIKEY');
        } catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function search(string $address) {
        /*$response = Http::get($this->url, [
            "key" => $this->apiKey,
            "q" => $address,
            "limit" => 5,
            "dedupe" =>  1,
        ]);*/

        $response = Http::withOptions([
            'verify' => false,
        ])->get($this->url, [
            'key' => $this->apiKey,
            'q' => $address,
            'limit' => 5,
        ]);

        return $response->json();
    }
}