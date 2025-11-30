<?php

namespace App\Services;

use Illuminate\Support\Facades\View;
//use Symfony\Component\Mailer\Mailer;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Mime\Email;
//use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
//use Symfony\Component\Mailer\Transport\Smtp\Auth\Xoauth2Authenticator;
use App\Services\GmailOauthService;
use Illuminate\Support\Facades\Http;


class GmailService {


    public function send($destination, $mailable) {
        $accessToken = (new GmailOauthService())->getGmailAccessToken();
        /*$transport = new EsmtpTransport(
            host: 'smtp.gmail.com',
            port: 587,
            authenticators: [new Xoauth2Authenticator()]
        );

        $transport->setUsername(env('MAIL_USERNAME'));
        $transport->setPassword($accessToken);*/


        $content = $mailable->content();
        //$mailer = new Mailer($transport);

        $plain = View::make($content->text, $content->with)->render();
        $html = View::make($content->view, $content->with)->render();

        $mailableFrom = $mailable->envelope()->from;
        $from = "{$mailableFrom->name} <{$mailableFrom->address}>";

        //Create a Symfony email object
        $email = new Email();

        $email->from($from ?? env('MAIL_FROM_ADDRESS'))
            ->to($destination)
            ->subject($mailable->envelope()->subject)
            ->text($plain)
            ->html($html);
        //$mailer->send($email);

        //Send object as a MIME via HTTPS
        $rawMime = $email->toString();

        $rawEncoded = rtrim(strtr(base64_encode($rawMime), '+/', '-_'), '=');

        $response = Http::withHeaders([
            'Authorization' => "Bearer {$accessToken}",
            'Content-Type' => 'application/json',
        ])->post('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', [
            'raw' => $rawEncoded,
        ]);

        if ($response->failed()) {
            Log::error('Gmail API send failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            throw new \Exception("Gmail API send failed.");
        }
    }

}