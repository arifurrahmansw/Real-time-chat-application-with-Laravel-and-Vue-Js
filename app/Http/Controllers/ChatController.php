<?php
namespace App\Http\Controllers;
use Response;
use Validator;
use App\Models\User;
use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{

    protected $per_page = 30;
    protected $to_user = NULL;
    protected $from_user = NULL;

    public function __construct()
    {
        $this->middleware('auth');
        $this->from_user = Auth::user();
    }

    public function getChatBox(Request $request,$user_id)
    {
        $to_user = User::findOrFail($user_id);
        $from_user = Auth::user();
           return view('chat.index',compact('to_user','from_user'));
    }

    public function getMessages(Request $request)
    {
        $messages = Message::where(function($query) {
            $query->where('user_id','=', Auth::user()->id)
                ->orWhere('to_user','=', Auth::user()->id);
        })
        ->with('user');
        $messages = $messages->paginate($request->per_page ?? $this->per_page);
        $totalMessages = $messages->total();
        $lastPage = $messages->lastPage();
        $response = [
            'status'=>true,
            'total' => $totalMessages,
            'last_page' => $lastPage,
            'last_message_id' => collect($messages->items())->last()->id ?? null,
            'messages' => $messages->items(),
        ];
        return Response::json($response);
   }

    public function sendMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message' => 'required',
            'user_game_id' => 'required',
        ]);
        DB::beginTransaction();
        try {
        $user = Auth::user();
        $to_user = User::findOrFail($request->to_user['id']);
        $message = new Message();
        $message->user_id = Auth::user()->id;
        $message->from_user_name = Auth::user()->name;
        $message->to_user = $to_user->id;
        $message->to_user_name = $to_user->name;
        $message->message = htmlentities(trim($request->message), ENT_QUOTES, 'UTF-8');
        $message->message_id = mt_rand(9, 999) + time();
        $message->created_at = date('Y-m-d H:i:s');
        $message->created_by = Auth::user()->id;
        $message->save();
        $query = Message::where('id',$message->id)->with('user')->first();
    } catch (\Exception $e) {
        dd($e->getMessage());
        DB::rollback();
        return Response::json([
            'status' => false,
            'message' => NULL,
            'user' => NULL,
            'msg' => 'Message not Sent!'
        ]);
    }
        DB::commit();
        broadcast(new MessageSent($user, $message,$request->to_user['id']))->toOthers();
        return Response::json([
            'status'=>true,
            'message' => $query,
            'user' => $user,
            'msg' => 'Message successfully Sent!'
        ]);
    }



}
