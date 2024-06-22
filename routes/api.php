<?php

use App\Http\Controllers\CorretorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/corretor/{id}", [CorretorController::class, "get"])->name("api.getCorretor");
Route::put("/corretor/{id}", [CorretorController::class, "update"])->name("api.updateCorretor");
Route::delete("/corretor/{id}", [CorretorController::class, "delete"])->name("api.deleteCorretor");
