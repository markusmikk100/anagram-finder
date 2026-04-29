<?php

namespace App\Services;

use App\Services\WordSortingService;
use App\Models\Word;

class WordFindService
{
    public function __construct(protected WordSortingService $wordSortingService)
    {
    }
    public function findFromWordbase($word)
    {
        $word = mb_strtolower($word);
        $sortedWord = $this->wordSortingService->alphabeticalSort($word);
        $foundTable = Word::where('sorted_word', '=', $sortedWord)->get();
        $foundWordTable = $foundTable->pluck('word')->toArray();
        return $foundWordTable;
    }
}
