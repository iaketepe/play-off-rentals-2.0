<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app', ['page' => 'home']);
});

Route::get('/rent', function () {
    return view('app', ['page' => 'rent']);
});

Route::get('/faq', function () {
    return view('app', ['page' => 'faq']);
});

Route::get('/contact', function () {
    return view('app', ['page' => 'contact']);
});