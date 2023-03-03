<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class PassResetRequest extends FormRequest
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
            'password'              => 'required|min:8',
        ];
        return $rules;
    }

    public function messages()
    {
        return [
           'password.required'      => 'Please Enter Your Password',

        ];
    }


}
