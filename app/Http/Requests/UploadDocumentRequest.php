<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class UploadDocumentRequest extends FormRequest
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
            'game_document'     => 'required|mimes:jpeg,jpg,png,gif|max:10000',
            'user_game_id'     => 'required',
        ];
        return $rules;
    }

    public function messages()
    {
        return [
        ];
    }


}
