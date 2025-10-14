<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Machines;

class MachineController extends Controller {

    public function getMachines() {
        $machines = Machines::all();
        return response()->json($machines);
    }
}

