<?php

namespace App\Http\Controllers;

use App\Models\Word;
use Illuminate\Support\Facades\Http;

class WordbaseController extends Controller
{
    public function import(){

        $response = Http::withoutVerifying()->get('https://www.opus.ee/lemmad2013.txt');

        if (! $response->successful()) {
            return 'Failed to fetch wordbase';
        }

        $text = $response->body();
        $word = explode("\n", $text); // Base words

        for ($i = 0; $i < count($word); $i++) { // Words where letters are in alphabetical order
            $currentWord = trim($word[$i]);

            $chars = str_split($currentWord);
            sort($chars);
            $sorted_word = implode('', $chars);

            $pair = [$currentWord, $sorted_word]; // Takes word and sorted words and makes them an array
            Word::logReceivedPair($pair);
            }
        return;
    }
}
