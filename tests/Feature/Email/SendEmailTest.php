<?php

namespace Tests\Feature\Email;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\MailController;
use Tests\TestCase;

class SendEmailTest extends TestCase
{
    /**
     * Testing the Email Submission feature on ContactCore
     */
    public function test_sendEmail(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/email', [
            'firstname' => 'John',
            'lastname'  => 'Doe',
            'email'     => 'john@gmail.com',
            'subject'   => 'Hello',
            'message'   => 'Testing email feature',
            'cf-turnstile-response' => 'fake-token',
        ]);

        $response->assertStatus(400);

        $response = $this->postJson('/api/email', [
            'firstname' => 'John',
            'lastname'  => 'Doe',
            'email'     => 'john.@.example.com',
            'subject'   => 'Hello',
            'message'   => 'Testing email feature',
            'cf-turnstile-response' => '',
        ]);

        $response->assertStatus(422);

        $response = $this->postJson('/api/email', [
            'email'     => 'john@example.com',
            'subject'   => 'Hello',
            'message'   => 'Testing email feature'
        ]);

        $response->assertStatus(422);


        $response = $this->postJson('/api/email', [
            'firstname' => 25,
            'lastname'  => 'Doe',
            'email'     => 'john@example.com',
        ]);

        $response->assertStatus(422);

        /*$this->partialMock(MailController::class, function ($mock) {
            $mock->shouldReceive('validateTurnstile')
                ->andReturn(['success' => true]);
        });*/

        /*$response = $this->postJson('/api/email', [
            'firstname' => 'John',
            'lastname'  => 'Doe',
            'email'     => 'john@gmail.com',
            'subject'   => 'Hello',
            'message'   => 'Testing email feature',
            'cf-turnstile-response' => 'mock-token',
        ]);

        $response->assertStatus(200);*/
    }
}
