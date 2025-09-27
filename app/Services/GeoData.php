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

    public function __construct() {
        $this->url = env('GEODATA_URL');
        $this->apiKey = env('GEODATA_KEY');
        $this->urlHotline = '/map/tiles/{z}/{x}/{y}.png';
        $this->attribution = env('GEODATA_ATTRIBUTION');
    }

    public function getMetaData() {
        return [
            'urlHotline' => $this->urlHotline,
            'attribution' => $this->attribution
        ];
    }

    public function getTiles($z, $x, $y) {
        $client = new Client();

        $url = "{$this->url}/{$z}/{$x}/{$y}.png";

        $promise = $client->getAsync($url, [
            'query' => ['apiKey' => $this->apiKey],
            'verify' => false,
        ]);
        $response = $promise->wait();
        /*$response = HTTP::WithOptions([
            'verify' => false,
        ])->get($url, [
            'apiKey' => $this->apiKey,
        ]);*/

        return $response;
    }
}