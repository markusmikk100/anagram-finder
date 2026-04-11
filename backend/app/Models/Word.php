<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    protected $fillable = [
        'word',
        'sorted_word',
    ];

    public static function logReceivedPair(String $currentWord, String $sorted_word): void
    {
        error_log($currentWord . ':' . $sorted_word);

        Word::firstOrCreate(
            ['word' => $currentWord],
            ['sorted_word' => $sorted_word]);
    }
}
