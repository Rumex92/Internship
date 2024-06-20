<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    // Define the table associated with the model (optional if table name is 'services')
    protected $table = 'services';

    // Define the fillable attributes
    protected $fillable = [
        'service_name',
        'description',
        'price',
        'category_id',
    ];

    // Define the relationship with the Category model
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
