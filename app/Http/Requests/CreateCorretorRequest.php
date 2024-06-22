<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCorretorRequest extends FormRequest
{
    protected $redirect = "/";

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nome" => "required|string|min:2|max:120",
            "cpf" => "required|string|min:15|max:15",
            "creci" => "required|string|min:2|max:30"
        ];
    }
}
