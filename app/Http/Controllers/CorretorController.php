<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCorretorRequest;
use App\Models\Corretor;
use Illuminate\Http\Request;

class CorretorController extends Controller
{
    public function cadastrarAction(CreateCorretorRequest $request) {
        $dados = $request->validated();

        $dados["cpf"] = str_replace(".", "", $dados["cpf"]);
        $dados["cpf"] = str_replace("-", "", $dados["cpf"]);

        Corretor::create($dados);

        return redirect("/")->with("status", "Corretor cadastrado com sucesso!");
    }

    
    public function get(Request $request, int $id) {
        $corretor = Corretor::find($id);

        if($corretor == null || $corretor instanceof Corretor == false) {
            return response()->json([
                "error" => "Recurso não encontrado",
                "status" => 404
            ], 404);
        }

        return response()->json([
            "corretor" => $corretor,
            "status" => 200
        ], 200);
    }

    public function update(Request $request, int $id) {
        $corretor = Corretor::find($id);

        if($corretor == null || $corretor instanceof Corretor == false) {
            return response()->json([
                "error" => "Recurso não encontrado",
                "status" => 404
            ], 404);
        }

        $validatedData = $request->validate([
            "nome" => "required|string|min:2|max:120",
            "cpf" => "required|string|min:14|max:14",
            "creci" => "required|string|min:2|max:6"
        ]);

        if(isset($validatedData["errors"]) && count($validatedData["errors"]) > 0) {
            return response()->json([
                "errors" => $validatedData["errors"],
                "status" => 400
            ], 400);
        }

        $corretor->nome = $validatedData["nome"];
        $corretor->cpf = $validatedData["cpf"];
        $corretor->cpf = str_replace(".", "", $corretor->cpf);
        $corretor->cpf = str_replace("-", "", $corretor->cpf);
        $corretor->creci = $validatedData["creci"];

        $corretor->save();

        return response()->json([
            "corretor" => $corretor,
            "status" => 200
        ], 200);
        
    }

    public function delete(Request $request, int $id) {
        $corretor = Corretor::find($id);

        if($corretor == null || $corretor instanceof Corretor == false) {
            return response()->json([
                "error" => "Recurso não encontrado",
                "status" => 404
            ], 404);
        }

        $corretor->delete();

        return response()->json([
            "status" => 200
        ], 200);
    }
}
