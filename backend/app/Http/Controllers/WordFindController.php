<?php

namespace App\Http\Controllers;

use App\Services\WordFindService;
class WordFindController extends Controller
{
    public function find(WordFindService $wordFindService)
    {
        $request = "ilutaim";

        $wordFindService->findFromWordbase($request);


    }
}
