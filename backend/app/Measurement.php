<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class Measurement extends Model{

    const TYPE_SOUND = 1;
    const TYPE_MOVEMENT = 2;
    const TYPE_TEMPERATURE = 3;

    const UNIT_PERCENT = 1;
    const UNIT_CELSIUS = 2;
    const UNIT_BOOLEAN = 3;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $fillable = ['id', 'value', 'unit', 'type', 'date'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden   = ['created_at', 'updated_at'];
}