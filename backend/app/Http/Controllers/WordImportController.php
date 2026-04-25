<?php

namespace App\Http\Controllers;

use App\Services\WordImportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\ConnectionException;
use OpenApi\Attributes as OA;
class WordImportController extends Controller
{
    #[OA\Post(
        path: "/api/wordbase/import",
        summary: "Import wordbase",
        tags: ["Import"],
        parameters: [
            new OA\RequestBody(
                request: "URL",
                description: "Import wordbase",
                required: true,
                content: new OA\JsonContent(
                    example: [
                        'url' => "https://www.opus.ee/lemmad2013.txt"
                    ]
                )
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Wordbase imported",
            ),
            new OA\Response(
                response: 400,
                description: "Invalid URL",
            ),
            new OA\Response(
                response: 415,
                description: "Only plain text files allowed",
            )
        ]
    )]
    public function import(WordImportService $wordImportService, Request $request)
    {
        try {
            $url = Http::withoutVerifying()->get($request->input('url'));
        } catch (ConnectionException) {
            return response()->json(['message' => 'URL could not be reached'], 400);
        }

        if (!$url->successful()) {
            return response()->json(['message' => 'Request unsuccessful'], 400);
        }

        if (!str_contains($url->header('Content-Type'), 'text/plain')) {
            return response()->json(['message' => 'Only plain text files allowed'], 415);
        }

        $wordImportService->importFromWordbase($url);

        return response()->json(['message' => 'Wordbase imported']);
    }
}
