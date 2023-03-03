<?php
namespace App\Http\Requests\Admin;
use Illuminate\Foundation\Http\FormRequest;
class ProductRequest extends FormRequest
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
            'product_name'      => 'required|unique:products,product_name',
            'product_slug'      => 'required',
            'category_id'       => 'required',
            'thumbnail'         => 'required',
            'product_type'      => 'required',
            'shipping_cost'     => 'required',
            'unit_price'        => 'required',
            'details'           => 'required',
            'type'              => 'required',
            'has_free_credit'   => 'required',
        ];
        return $rules;
    }

    public function messages()
    {
        return [
           'category_id.required'  => 'Category name field is required.',
        ];
    }


}
