<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\AutoCoder;
use App\Services\GeoData;

class MapController extends Controller {
    private AutoCoder $autocoder;
    private GeoData $geodata;

    public function __construct() {
        $this->autocoder = new AutoCoder();
        //$this->geodata = new GeoData();
    }

    public function autocomplete(Request $request) {
        $query = $request->query('query');
        $locations = $this->autocoder->search($query);

        return response()->json($locations);
    }
}