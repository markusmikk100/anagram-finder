<?php

namespace App\Http\Controllers;

use App\Services\WordFindService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;
class WordFindController extends Controller
{
    #[OA\Get(
        path: "/api/wordbase/find/{word}",
        summary: "Find anagrams for a word",
        tags: ["Find"],
        parameters: [
            new OA\PathParameter(
                name: "word",
                description: "The word to find anagrams for",
                schema: new OA\Schema(type: "string")
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "JSON array of anagrams (Empty if word not in the wordbase)",
                content: new OA\JsonContent(
                    type: "array",
                    items: new OA\Items(type: "string"),
                    example: ['ilutaim', 'liituma', 'maituli']
                )
            )
        ]
    )]
    public function find(WordFindService $wordFindService, Request $request)
    {
        $word = $request->route('word');
        $foundWordTable = $wordFindService->findFromWordbase($word);

        if ($foundWordTable == []) {
            return response()->json(['message' => 'No anagrams found for the given word'], 404);
        }
        return response()->json($foundWordTable);
    }
}
