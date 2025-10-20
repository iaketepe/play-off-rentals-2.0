<?php

namespace App\Services;

//use Illuminate\Support\Facades\Http; 

use GuzzleHttp\Client;
use GuzzleHttp\Promise;

use Exception;

class GeoData {
    private String $url;
    private String $apiKey;
    private String $urlHotline;
    private String $attribution;
    private Client $client;

    public function __construct() {
        try {
            $this->url = env('GEODATA_URL');
            $this->apiKey = env('GEODATA_KEY');
            $this->urlHotline = '/api/map/tiles/{z}/{x}/{y}.png';
            $this->attribution = env('GEODATA_ATTRIBUTION');

            $this->client = new Client([
                'headers' => ['Connection' => 'keep-alive'],
                'timeout' => 5,
                'connect_timeout' => 2,
            ]);
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

    }

    public function getMetaData() {
        return [
            'urlHotline' => $this->urlHotline,
            'attribution' => $this->attribution
        ];
    }

    public function getTiles($z, $x, $y) {
        try {
            $url = "{$this->url}/{$z}/{$x}/{$y}.png";

            $promise = $this->client->getAsync($url, [
                'query' => ['apiKey' => $this->apiKey],
                'verify' => false,
            ]);
            $response = $promise->wait();
            return $response;
        } catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

        /*$response = HTTP::WithOptions([
            'verify' => false,
        ])->get($url, [
            'apiKey' => $this->apiKey,
        ]);*/

        
    }
}