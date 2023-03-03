<?php
?>
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="Developed By" content="" />
    <meta name="Designer" content="" />
    <title>@yield('title') </title>
    <meta name="csrf-token" id="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    <link rel="stylesheet" href="{{ asset('assets/css/frontend-main.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('assets/css/frontend-responsive.css') }}?v={{ time() }}">
    @stack('custom_css')
    <script src="{{ asset('assets/js/jquery.min.js') }}"></script>
</head>

<body>
    <div id="app">
   
<!-- ============================ Header start ============================  -->
<header class="header_section">
    <div class="header_menu mb-5 sticky-top">
        <div class="container">
            <!-- desktop menu -->
            <nav class="navbar navbar-expand-lg p-0">
                <div class="container-fluid">
                    <a class="navbar-brand" href="{{ route('home') }}" data-aos="fade-up" data-aos-offset="0">
                        Chat App
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" href="#mobileoffcanvas"
                        role="button" aria-controls="mobileoffcanvas">
                        <img src="{{ asset('assets/images/icon/bar.svg')}}" alt="icon">
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                         
                        </ul>
                        <ul class="navbar-nav mb-2 header_right_btn ms-auto mb-lg-0">
                            @auth
                            <div class="loggedin_user">
                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown"
                                    data-bs-display="static" aria-expanded="false">
                                    <img src="{{asset($row->image ?? 'assets/images/default-user.png') }}"
                                                            class="rounded-circle" width="50" height="50" alt="user">
                                
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">

                                    <li>
                                        <a class="dropdown-item" href="">
                                            <img src="{{ asset('assets/images/icon/user.svg') }}" alt="Profile">
                                            Profile
                                        </a>
                                    </li>
                                   
                             
                                    <li>
                                        <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                document.getElementById('logout-form').submit();"
                                            title="{{ __('Logout') }}">
                                            <img src="{{ asset('assets/images/icon/signout.svg') }}" alt="signout">
                                            {{ __('Sign Out') }}
                                        </a>
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                            class="d-none">
                                            @csrf
                                        </form>
                                    </li>
                                </ul>

                            </div>

                            @else
                            <li class="nav-item">
                                <a class="btn loginBtn me-2" href="javascript:void(0)" data-bs-toggle="modal"
                                    data-bs-target="#loginModal">Log In</a>
                            </li>
                            <li class="nav-item">
                                <a class="btn singupBtn" href="javascript:void(0)" data-bs-toggle="modal"
                                    data-bs-target="#singupModal">Sign Up</a>
                            </li>
                            @endauth
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</header>
<!-- ============================ Header end ============================  -->


        @yield('content')
    </div>
    <!-- js file -->
    <script src="{{ asset('assets/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/js/tilt.jquery.min.js') }}"></script>
    @stack('custom_js')
</body>

</html>
