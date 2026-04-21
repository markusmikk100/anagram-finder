<?php

use App\Http\Controllers\WordImportController;
use App\Http\Controllers\WordFindController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

