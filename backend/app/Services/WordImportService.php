<?php

namespace App\Services;

use App\Models\Word;
use App\Services\WordSortingService;

ini_set('max_execution_time', 600); # 10min
class WordImportService
{
    public function __construct(protected WordSortingService $wordSortingService)
    {
    }
    public function importFromWordbase($response)
    {
        $word = explode("\n", $response->body());
        $data = [];
        $now = now();

        for ($i = 0; $i < count($word); $i++) {
            $currentWord = trim($word[$i]);

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
        }

        foreach (array_chunk($data, 1000) as $chunk) {
            Word::insertOrIgnore($chunk);
        }
    }

}
