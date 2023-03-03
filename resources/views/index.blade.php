@extends('layouts.app')
@section('content')
        <div class="signin_sec">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-12">
                        <div class="user_dashboard_sec mb-5">
                            <div class="container">
                                <div class="section_heading mb-5 text-center" data-aos="fade-up">
                                    <h2>Users</h2>
                                </div>
                                <div class="row mx-auto">
                                    <div class="col-md-12 col-lg-12">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Name</th>
                                                    <th>Photo</th>
                                                    <th>Email</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @if(!empty($data) && count($data) > 0)
                                                @foreach($data as $row)
                                                <tr>
                                                    <td>{{$row->id}}</td>
                                                    <td>{{$row->name}}</td>
                                                    <td> 
                                                        <img src="{{asset($row->image ?? 'assets/images/default-user.png') }}"
                                                            class="rounded-circle" width="50" height="50" alt="user">
                                                    </td>
                                                    <td>{{$row->email}}</td>
                                                    
                                                    <td>
                                                        @if(Auth::user()->id ==$row->id)
                                                        @else
                                                        <a href="{{route('open.chat',$row->id)}}" class="btn btn-success">
                                                            <i class="fa fa-comment"></i>Chat
                                                        </a>
                                                        @endif
                                                    </td>
                                                </tr>
                                                @endforeach
                                                @endif
                                        </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection