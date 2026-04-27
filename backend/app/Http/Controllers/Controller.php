<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Server(url: L5_SWAGGER_CONST_HOST, description: "Local")]
#[OA\Server(url: "https://anagram-finder-backend-production.up.railway.app", description: "Railway")]

#[OA\Info(
    title: 'anagram-lookup',
    description: 'API documentation for anagram-lookup',
    version: '1.0.0'
)]

abstract class Controller
{
    //
}
