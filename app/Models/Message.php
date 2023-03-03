<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['message'];


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function user_to()
    {
        return $this->belongsTo('App\Models\User','to_user','id');
    }

}
