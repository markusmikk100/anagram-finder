<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Word extends Model
{
    protected $fillable = [ // Only these can be set in bulk
        'word',
        'sorted_word',
    ];
}
