<?php

use Illuminate\Http\Request;

class LoginController {

    public function login(Request $request) {
        $validated = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
    }
}