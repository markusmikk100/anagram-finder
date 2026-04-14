<?php

namespace App\Services;

use App\Services\WordSortingService;

class WordFindService
{
    public function findFromWordbase($request)
    {
        $sortedWord = WordSortingService::alphabeticalSort($request);

        error_log($sortedWord);
        // Word::firstOrCreate(
        //     ['word' => $currentWord],
        //     ['sorted_word' => $sortedWord]
        // );
    }
}
