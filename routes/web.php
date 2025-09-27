<?php

use App\Http\Controllers\MapController;

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app', ['page' => 'home']);
});

Route::get('/rent', function () {
    return view('app', ['page' => 'rent']);
});

Route::get('/contact', function () {
    return view('app', ['page' => 'contact']);
});



Route::get('/map/locations', [MapController::class, 'autoComplete']); 


Route::get('/map/tiles/metadata', [MapController::class, 'tilesMetaData']);
Route::get('/map/tiles/{z}/{x}/{y}.png', [MapController::class, 'tiles']);