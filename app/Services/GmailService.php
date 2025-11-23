<?php

namespace App\Services;

use Illuminate\Support\Facades\View;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mailer\Transport\Smtp\Auth\Xoauth2Authenticator;
use App\Services\GmailOauthService;


class GmailService {


    public function send($destination, $mailable) {
        $accessToken = (new GmailOauthService())->getGmailAccessToken();
        $transport = new EsmtpTransport(
            host: 'smtp.gmail.com',
            port: 587,
            authenticators: [new Xoauth2Authenticator()]
        );

        $transport->setUsername(env('MAIL_USERNAME'));
        $transport->setPassword($accessToken);


        $content = $mailable->content();
        $mailer = new Mailer($transport);

        $plain = View::make($content->text, $content->with)->render();
        $html = View::make($content->view, $content->with)->render();

        $addr = $mailable->envelope()->from;
        $from = "{$addr->name} <{$addr->address}>";

        $email = new Email();

        $email->from($from ?? env('MAIL_FROM_ADDRESS'))
            ->to($destination)
            ->subject($mailable->envelope()->subject)
            ->text($plain)
            ->html($html);
        $mailer->send($email);

    }

}