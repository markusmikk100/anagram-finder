<?php

namespace App\Http\Controllers;

use App\Services\WordFindService;
use Illuminate\Http\Request;
class WordFindController extends Controller
{
    public function find(WordFindService $wordFindService, Request $request)
    {
        $word = $request->route('word');
        $foundWordTable = $wordFindService->findFromWordbase($word);
        return response()->json($foundWordTable);
    }
}
