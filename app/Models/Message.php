<?php
namespace App\Models;
use App\Traits\RepoResponse;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use RepoResponse;
    protected $fillable = ['message'];
    public function getMessageUserList($request, int $page = 20)
    {
        $data = $this->where('messages.admin_seen',0)->with('user')->groupBy('messages.user_id')->orderBy('messages.id','DESC');
        $data = $data->paginate($page);
       return $this->formatResponse(true, '', 'admin.message.index', $data);
    }

    // public function customer()
    // {
    //     return $this->belongsTo(User::class);
    // }
    // public function customer_to()
    // {
    //     return $this->belongsTo('App\Models\User','to_user','id');
    // }


    public function getUserMessage(int $id)
    {
        $data =  Message::where('user_id',$id)->orWhere('to_user',$id)->orderBy('id','DESC')->paginate(100);
        if (!empty($data)) {
            return $this->formatResponse(true, 'Data found', 'admin.message.view', $data);
        }
        return $this->formatResponse(false, 'Did not found data !', 'admin.message.index', null);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function user_to()
    {
        return $this->belongsTo('App\Models\User','to_user','id');
    }

}
