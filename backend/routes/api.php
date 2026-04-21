<?php

use App\Http\Controllers\WordImportController;
use App\Http\Controllers\WordFindController;

Route::post('/wordbase/import', [WordImportController::class, 'import']);
Route::get('/wordbase/find/{word}', [WordFindController::class, 'find']);
