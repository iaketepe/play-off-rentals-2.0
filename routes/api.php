<?php


use App\Http\Controllers\MapController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\PayController;
use App\Http\Controllers\MailController;


use Illuminate\Support\Facades\Route;


Route::get('/map/locations', [MapController::class, 'autoComplete']); 
Route::get('/map/tiles/metadata', [MapController::class, 'tilesMetaData']);
Route::get('/map/tiles/{z}/{x}/{y}.png', [MapController::class, 'tiles']);


Route::get('/machines', [MachineController::class, 'getMachines']);


Route::post('/payment', [PayController::class, 'initializePayment']);

Route::post('/email', [MailController::class, 'sendEmail']);
