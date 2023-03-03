<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class RegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */


    public function rules()
    {
         $rules = [
            '_token'                => 'required',
            'name'                  => 'required',
            'email'                 =>"required|email|unique:users,email",
            'username'                 =>"required|string|unique:users,username",
            'password'              => 'min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'required|min:6'
        ];
        return $rules;
    }

    public function messages()
    {
        return [
           'name.required'          => 'Please enter your name',
           'email.required'         => 'Please enter your email',
           'password.required'      => 'Please enter your password',
           'password_confirmation.required'  => 'This field is required',

        ];
    }


}
