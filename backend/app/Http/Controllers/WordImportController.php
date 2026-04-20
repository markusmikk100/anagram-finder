<?php

namespace App\Http\Controllers;

use App\Services\WordImportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
class WordImportController extends Controller
{
    public function import(WordImportService $wordImportService, Request $request)
    {
        $url = Http::withoutVerifying()->get($request->input('url'));

        if (!$url->successful()) {
            return response()->json(['message' => 'Failed to fetch wordbase'], 400);
        }

        $wordImportService->importFromWordbase($url);

        return response()->json(['message' => 'Wordbase imported']);
    }
}
