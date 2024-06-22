<?php

namespace App\Http\Controllers;

use App\Models\Corretor;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request) {
        $corretores = Corretor::all();


        $corretoresCount = $corretores->count();
        for($i = 0; $i < $corretoresCount; $i++) {
            $sliced = str_split($corretores[$i]->cpf, 1);

            //dd($sliced);

            $cpfPattern = "";

            $slicedCount = count($sliced);

            $cpfPatternCount = 0;

            $sliceAtual = 0;

            for($j = 0; $j < 15 && $sliceAtual < 11; $j++) {
                if($cpfPatternCount == 3) {
                    $cpfPattern .= '.';
                } else if($cpfPatternCount == 7) {
                    $cpfPattern .= '.';
                } else if($cpfPatternCount == 11) {
                    $cpfPattern .= '-';
                } else {
                    $cpfPattern .= "$sliced[$sliceAtual]";
                    $sliceAtual++;
                }

                $cpfPatternCount = count(str_split($cpfPattern));
            }

            $corretores[$i]->cpf = $cpfPattern;
        }
        
        $status = $request->session()->get("status", null);

        return view("home", [
            "status" => $status,
            "corretores" => $corretores
        ]);
    }
}
