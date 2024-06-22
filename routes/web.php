<?php


use App\Http\Controllers\CorretorController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;


Route::get("/", [HomeController::class, "index"])->name("home");
Route::post("/corretor", [CorretorController::class, "cadastrarAction"])->name("cadastrarAction");