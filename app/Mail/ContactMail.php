<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    private $data;

    /**
     * Create a new message instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->data['email'] . ' - ' . $this->data['subject'] ?? 'Someone sent us a mesesage',
            from: new Address(
                $this->data['email'],
                trim(($this->data['firstname'] ?? '') . ' ' . ($this->data['lastname'] ?? ''))
            ),
            replyTo: [$this->data['email'] ?? null]
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact',
            text: 'emails.contact_plain',
            with: [
                'first_name' => $this->data['firstname'],
                'last_name' => $this->data['lastname'],
                'message_text' => $this->data['message']
            ],
        );
    }

}
