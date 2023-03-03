<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class HomeController extends Controller
{


    public $user;
    public function __construct(
        User $user
    )
    {
        $this->user     = $user;
        $this->middleware('auth');

    }

    public function index(Request $request)
    {
        $data = $this->user->get();
         return view('index')->withData($data);
    }



}
