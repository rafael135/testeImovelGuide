<?php

namespace App\Http\Controllers;

use App\Models\Corretor;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request) {
        $corretores = Corretor::all();
        
        $status = $request->session()->get("status", null);

        return view("home", [
            "status" => $status,
            "corretores" => $corretores
        ]);
    }
}
