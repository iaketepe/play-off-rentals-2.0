<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GmailService;
use App\Mail\ContactMail;
use App\Mail\ReplyMail;
use Exception;

class MailController extends Controller {

    public $gmailService;

    public function __construct() 
    {
        $this->gmailService = new GmailService();
    }

    public function sendEmail(Request $request) {
        $validated = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);
        try {
            $this->gmailService->send($validated['email'], new ReplyMail($validated));
            $this->gmailService->send(config('mail.from.address'), new ContactMail($validated));
        } catch (Exception $e) {
            return response()->json(['error' => 'Email could not be sent: ' . $e], 500);
        }


        return response()->json(['message' => 'Email sent successfully!']);
    }
}