<?php
namespace App\Http\Requests\Admin;
use Illuminate\Foundation\Http\FormRequest;
class FaqRequest extends FormRequest
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
            '_token'       => 'required',
            'title'        => 'required|unique:faqs,title',
            'body'         => 'required',
        ];
        return $rules;
    }

    public function messages()
    {
        return [
           'title.required'  => 'The Question field is required.',
           'body.required'  => 'The Answer field is required.'
        ];
    }


}
