<?php

namespace App\Services;

use App\Models\Word;
use App\Services\WordSortingService;

ini_set('max_execution_time', 600); # 10min
class WordImportService
{
    public function importFromWordbase($response)
    {
        $word = explode("\n", $response->body());

        for ($i = 0; $i < count($word); $i++) {
            $currentWord = trim($word[$i]);
            $sortedWord = WordSortingService::alphabeticalSort($currentWord);

            error_log($currentWord . ':' . $sortedWord);
            Word::firstOrCreate(
                ['word' => $currentWord],
                ['sorted_word' => $sortedWord]
            );
        }
    }

}
