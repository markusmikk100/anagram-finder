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
        $word = explode("\n", $text);

        for ($i = 0; $i < count($word); $i++) {
            $currentWord = trim($word[$i]);
            $chars = mb_str_split($currentWord);
            sort($chars);
            $sorted_word = implode('', $chars);
            Word::logReceivedPair($currentWord, $sorted_word);
            }
        return "import ran";
    }
}
