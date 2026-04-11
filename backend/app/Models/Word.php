<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{

    public static function logReceivedPair(array $pair): void
    {
        error_log(($pair[0]) . ':' . ($pair[1]));
    }
}
