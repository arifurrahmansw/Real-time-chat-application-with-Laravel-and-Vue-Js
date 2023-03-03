<?php
namespace App\Http\Requests\Admin;
use Illuminate\Foundation\Http\FormRequest;
class ProPlayerRequest extends FormRequest
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
            '_token'            => 'required',
            'email'             => 'required|email|unique:users,email',
            'password'          => 'required|min:6',
            'name'              => 'required|max:255',
            'username'          => 'required|unique:users,username',
            'phone'             => 'required|max:20',
            'address'           => 'required|max:255',
            'image'             => 'nullable|mimes:jpeg,jpg,png,gif|max:1000',
        ];
        return $rules;
    }

    public function messages()
    {
        return [
           'email.required'         => 'Please enter your email',
           'password.required'      => 'Please enter your password',
        ];
    }


}
