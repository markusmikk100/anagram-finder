<?php

namespace App\Services;

class WordSortingService
{
    public function alphabeticalSort(string $currentWord)
    {
        $chars = mb_str_split($currentWord);     // "tea" to ['t', 'e', 'a'] & mb for UTF-8
        sort($chars);                            // ['t', 'e', 'a'] to ['a', 'e', 't']
        $sorted_word = implode('', $chars);     // ['a', 'e', 't'] to 'aet'
        return $sorted_word;
    }
}
