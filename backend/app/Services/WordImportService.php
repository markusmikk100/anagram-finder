<?php

namespace App\Services;

use App\Models\Word;

ini_set('max_execution_time', 600); # 10min
class WordImportService
{
    public function importFromWordbase($response)
    {
        $word = explode("\n", $response->body());

        for ($i = 0; $i < count($word); $i++) {
            $currentWord = trim($word[$i]); //" tea " to "tea"

            $chars = mb_str_split($currentWord); // "tea" to ['t', 'e', 'a'] & mb for UTF-8
            sort($chars); // ['t', 'e', 'a'] to ['a', 'e', 't']
            $sorted_word = implode('', $chars); // ['a', 'e', 't'] to 'aet'

            error_log($currentWord . ':' . $sorted_word);

            Word::firstOrCreate(
                ['word' => $currentWord],
                ['sorted_word' => $sorted_word]
            );
        }
    }

}
