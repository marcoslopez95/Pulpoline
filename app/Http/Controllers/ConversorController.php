<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

class ConversorController extends Controller
{
    //

    public function show(Request $request){
        return Inertia::render('Conversor/ConversorCard');
        // return Inertia::render('Welcome', [
        //             'canLogin' => true,
        //             'canRegister' => true,
        //             'laravelVersion' => Application::VERSION,
        //             'phpVersion' => PHP_VERSION,
        //         ]);
    }
}
