<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\ChatController;
// admin
use App\Http\Controllers\HomeController;
Route::get('clear', function() {
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    Artisan::call('route:clear');
    Artisan::call('config:cache');
    Artisan::call('config:clear');
    return 'DONE';
});
Route::get('get-user', function () {
    return Auth::user();
});
Route::get('/', [HomeController::class, 'index'])->name('home');
Auth::routes();
Route::get('users', [HomeController::class, 'users']);
//Chat
Route::get('chat/{user_id}', [ChatController::class, 'getChatBox'])->name('open.chat');
Route::get('get-message/{user_game_id?}', [ChatController::class, 'getMessages']);
Route::post('send-message', [ChatController::class, 'sendMessage']);
