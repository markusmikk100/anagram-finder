<?php

use App\Http\Controllers\WordbaseController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/wordbase/import', [WordbaseController::class ,'import']);
