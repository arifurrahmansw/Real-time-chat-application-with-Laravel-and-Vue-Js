<!-- resources/views/chat.blade.php -->
@extends('layouts.app')
@section('chat','active')
@section('title') Chat @endsection
<link href="{{ asset('css/app.css') }}" rel="stylesheet">
<script src="{{ asset('js/app.js') }}" defer></script>
@section('content')
<div class="user_dashboard_sec mb-5">
    <div class="container">
        <div class="section_heading mb-5 text-center" data-aos="fade-up">
            <h2>Chat</h2>
        </div>
        <div class="row">
            <div class="col-md-4 col-lg-3 mb-4">
            </div>
            <div class="col-md-8 col-lg-8">
                <div class="dashboard_wrapper p-0">
                    <div class="chat_user_box">
                        <div class="card card-success card-outline direct-chat direct-chat-success shadow-sm">
                            <div class="card-header">
                                <h3 class="card-title">Chat with <strong>{{ $to_user->name }}</strong></h3>
                            </div>
                            <div class="card-body" id="chat_body">
                                <chat-messages :messages="messages" :auth="{{ Auth::user() }}"></chat-messages>
                            </div>
                            <div class="card-footer">
                                <chat-form v-on:messagesent="addMessage" :user="{{ Auth::user() }}" :to_user="{{ $to_user }}" ></chat-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection