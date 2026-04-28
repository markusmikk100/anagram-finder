<?php

namespace App\Services;

use App\Models\Word;
use App\Services\WordSortingService;

ini_set('max_execution_time', 120); # 2min
class WordImportService
{
    public function __construct(protected WordSortingService $wordSortingService)
    {
    }
    public function importFromWordbase($response)
    {
        $words = explode("\n", $response->body());
        $data = [];
        $now = now();

        for ($i = 0; $i < \count($words); $i++) {
            $currentWord = trim($words[$i]);

            if ($currentWord === '') {
                continue;
            }

            $sortedWord = $this->wordSortingService->alphabeticalSort($currentWord);

            $data[] = [
                'word' => $currentWord,
                'sorted_word' => $sortedWord,
                'created_at' => $now,
                'updated_at' => $now,
            ];

            if (\count($data) >= 1000) {
                Word::insertOrIgnore($data);
                $data = [];
            }
        }
        Word::insertOrIgnore($data);
    }
}
