<?php

namespace App\Services;

use App\Services\WordSortingService;
use App\Models\Word;

class WordFindService
{
    public function __construct(protected WordSortingService $wordSortingService)
    {
    }
    public function findFromWordbase($request)
    {
        $sortedWord = $this->wordSortingService->alphabeticalSort($request);
        $foundTable = Word::where('sorted_word', '=', $sortedWord)->get();
        $foundWordTable = $foundTable->pluck('word')->toArray();
        return $foundWordTable;
    }
}
