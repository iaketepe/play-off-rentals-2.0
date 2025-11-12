<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;
use App\Mail\ReplyMail;
use Exception;

class MailController extends Controller {



    public function sendEmail(Request $request) {
        try {
            $validated = $request->validate([
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'email' => 'required|email',
                'subject' => 'required|string',
                'message' => 'required|string',
            ]);

            Mail::to(config('mail.from.address'))->send(new ContactMail($validated));
            Mail::to($validated['email'])->send(new ReplyMail($validated));
        } catch (Exception $e) {
            return response()->json(['error' => 'Email could not be sent'], 500);
        }


        return response()->json(['message' => 'Email sent successfully!']);
    }
}