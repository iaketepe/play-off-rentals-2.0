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
        $this->geodata = new GeoData();
    }

    public function tilesMetaData() {
        $metadata = $this->geodata->getMetaData();

        return response()->json($metadata);
    }

    public function tiles(Request $request) {
        $z = $request->route('z');
        $x = $request->route('x');
        $y = $request->route('y');

        $tiles = $this->geodata->getTiles($z,$x,$y);
        return response($tiles->getBody()->getContents(), $tiles->getStatusCode())->header('Content-Type', $tiles->getHeaderLine('Content-Type'));
    }

    public function autoComplete(Request $request) {
        $query = $request->query('query');
        $locations = $this->autocoder->search($query);

        return response()->json($locations);
    }


}