<?php

namespace App\Http\Controllers\Auth;
use Str;
use \Config;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Setting;
use App\Mail\WelcomeMail;
use Illuminate\Http\Request;
use App\Helpers\LocationHelper;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\ChangePasswordRequest;

class AuthController extends Controller
{
    protected $user;
    public function __construct(
        User            $user
    ) {
        $this->user     = $user;

        $link = Setting::first();

        Config::set('services.google.client_id', $link->google_client_id);
        Config::set('services.google.client_secret', $link->google_client_secret);
        Config::set('services.google.redirect', url('/auth/google/callback'));

        Config::set('services.facebook.client_id', $link->facebook_client_id);
        Config::set('services.facebook.client_secret', $link->facebook_client_secret);
        Config::set('services.facebook.redirect', preg_replace("/^http:/i", "https:", url('/auth/facebook/callback')));
    }

    public function postLogin(Request $request)
    {


        try {
            // $check_deactive = User::where('email',$request->email)->where('status',0)->first();
            // if(!empty($check_deactive)){
            //     Toastr::error(trans('Oops! your account has been deactivated! please contact website administrator'), 'Error', ["positionClass" => "toast-top-center"]);
            //     return redirect()->back();
            // }
            // $check_deleted = User::where('email',$request->email)->where('status',2)->first();
            // if(!empty($check_deleted)){
            //     Toastr::error(trans('Your account has been deleted ! Please create new account using a different email and/or mobile number'), 'Error', ["positionClass" => "toast-top-center"]);
            //     return redirect()->back();
            // }

            // if (Auth::guard('web')->attempt(['email' => $request->email, 'password' => $request->password])){
            //     return redirect()->route('user.dashboard');
            // }
            $user = Auth::attempt([
                'email'          => $request->email,
                'password'       => $request->password
            ]);
            if($user==false){
                Toastr::error(trans('oops! You have entered invalid credentials'), 'Error', ["positionClass" => "toast-top-center"]);

                return redirect()->back();
            }

        } catch (\Exception $e) {
            dd($e->getMessage());
            Toastr::error(trans('oops! You have entered invalid credentials'), 'Error', ["positionClass" => "toast-top-center"]);
            return redirect()->back();
        }
        $user = Auth::user();

        // if($user->user_type == 2){
        //     return redirect()->route('pro-player.dashboard');
        // }else{
        //     return redirect()->route('user.dashboard');
        // }

        return redirect()->back();

    }

    public function postRegister(Request $request)
    {
        try {
            $checkExist = User::where('email', $request->user_email)->whereNotNull('email')->first();
            if (!empty($checkExist)) {
                Toastr::error(trans('Cannot create account an identical account already exists!'), 'Error', ["positionClass" => "toast-top-center"]);
                return redirect()->back()->with('error', 'Already exist account')->withInput();;
            }
            $user                       = new User();
            $email                      = trim($request->user_email);
            $user->email                = $email;
            $user->password             = Hash::make($request->user_password);
            $location                   = LocationHelper::getLocation();
            if ($location) {
                $user->country          = $location->countryName;
                $user->country_code     = $location->countryCode;
                // $user->regionCode    = $location->regionCode;
                $user->state    = $location->regionName;
                $user->city     = $location->cityName;
                $user->city     = $location->cityName;
                $user->time_zone  = $location->timezone;
                // $user->isoCode          = $location->isoCode;
                // $user->latitude         = $location->latitude;
                // $user->longitude        = $location->longitude;
            }
            // $user->ip_address       = LocationHelper::getIP();
            // $user->device           = LocationHelper::getOS();
            // $user->browser          = LocationHelper::getBrowser();
            $user->user_type    = 1;
            $user->status       = 1;
            $username = implode('@', explode('@', $email, -1));
            $check = DB::table('users')->where('username',$username)->first();
            if($check){
                $max_id = DB::table('users')->max('id')+1;
                $username = $username.'_'.$max_id;
            }
            $user->username = $username;
            $user->save();
            if ($user) {
                Auth::guard('web')->login($user);
                /* return redirect()->route('user.dashboard'); */
                return redirect()->back();
            }
        } catch (\Exception $e) {
            dd($e->getMessage());
            Toastr::error('Something went wrong ', 'Success', ["positionClass" => "toast-top-center"]);
            return redirect()->back();
        }
        /* return redirect()->route('user.dashboard'); */
        return redirect()->back();
    }






    public function redirectToProvider(string $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback(string $provider)
    {

        $data = Socialite::driver($provider)->stateless()->user();
        $falsemail = trim(str_replace(' ','_',$data->name)) . '@gmail.com';
        $check_deactive = User::where('email', $data->email)->where('status', 0)->first();
        if (!empty($check_deactive)) {
            Toastr::error(trans('oops! your account has been deactivated! please contact website administrator'), 'Error', ["positionClass" => "toast-top-right"]);
            return redirect()->route('login');
        }
        try {
            if (!empty($data->email)) {
                $isExist  = User::where(['email' => $data->email])->first();
            } else {
                $isExist  = User::where('provider', $provider)->where('social_id', $data->id)->first();
            }
            if (!empty($isExist)) {
                $isExist->update([
                    'avatar'            => $data->avatar,
                    'provider'          => $provider,
                    'social_id'         => $data->id
                ]);
                Auth::login($isExist);
            } else {
                $base_name  = preg_replace('/\..+$/', '', $data->name);
                $base_name  = explode(' ', $base_name);
                $base_name  = implode('_', $base_name);
                $name  = Str::lower($base_name);
                $_unique_name       = $base_name ."_".uniqid();
                $user               = new User;
                $user->name         = $data->name;
                $email              = $data->email ?? $falsemail;
                $user->email        = $email;
                $user->profile_image = $data->avatar ?? NULL;
                $user->provider    = $provider;
                $user->social_id   = $data->id;
                $user->status      = 1;
                $user->user_type   = 1;

                $username = implode('@', explode('@', $email, -1));
                $check = DB::table('users')->where('username',$username)->first();
                if($check){
                    $max_id = DB::table('users')->max('id')+1;
                    $username = $username.'_'.$max_id;
                }
                $user->username = $username;

                $user->save();
                Auth::login($user);
                if ($user->email) {
                    Mail::to($user->email)->send(new WelcomeMail($user));
                }
            }
        } catch (\Exception $e) {
            dd($e->getmessage());
            Toastr::error(trans('Login failed. Please try again'), 'Error', ["positionClass" => "toast-top-right"]);
            return redirect()->route('login');
        }
        return redirect()->route('user.card');
    }


}
