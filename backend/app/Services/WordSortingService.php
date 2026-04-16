<?php

namespace App\Services;

class WordSortingService
{
    public function alphabeticalSort(string $currentWord)
    {
        $chars = mb_str_split($currentWord);
        sort($chars);
        $sorted_word = implode('', $chars);
        return $sorted_word;
    }
}
