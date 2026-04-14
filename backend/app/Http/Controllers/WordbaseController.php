<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Services\WordImportService;

class WordbaseController extends Controller
{
    public function import(WordImportService $wordImportService)
    {
        $response = Http::withoutVerifying()->get('https://www.opus.ee/lemmad2013.txt');

        if (!$response->successful()) {
            return 'Failed to fetch wordbase';
        }

        $wordImportService->importFromWordbase($response);

        return "import ran";
    }
}
