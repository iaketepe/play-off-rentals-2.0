<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GmailService;
use App\Mail\ContactMail;
use App\Mail\ReplyMail;
use Exception;
use InvalidArgumentException;

class MailController extends Controller {

    public $gmailService;

    public function __construct() 
    {
        $this->gmailService = new GmailService();
    }


    function validateTurnstile($token, $remoteip = null) {
        $url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

        $data = [
            'secret' => env('MAIL_TURNSTILE_KEY'),
            'response' => $token
        ];

        if ($remoteip) {
            $data['remoteip'] = $remoteip;
        }

        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data)
            ]
        ];

        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);

        if ($response === FALSE) {
            return ['success' => false, 'error-codes' => ['internal-error']];
        }

        return json_decode($response, true);

    }

    public function sendEmail(Request $request) {
        $validated = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email:rfc,dns',
            'subject' => 'required|string',
            'message' => 'required|string',
            'cf-turnstile-response' => 'required|string'
        ]);

        try {
            $turnstileConfirmation = $this->validateTurnstile($validated['cf-turnstile-response']);

            if (!$turnstileConfirmation['success']) {
                throw new \InvalidArgumentException('Invalid turnstile token');
            }

            $this->gmailService->send($validated['email'], new ReplyMail($validated));
            $this->gmailService->send(config('mail.from.address'), new ContactMail($validated));
        } catch (InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage() . $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['error' => 'Email could not be sent: ' . $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Email sent successfully!']);
    }
}