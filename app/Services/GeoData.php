<?php

class GeoData {
    private String $url;
    private String $apiKey;

    public function __construct() {
        $this->url = env('GEODATA_URL');
        $this->apiKey = env('GEODATA_KEY');
    }
}