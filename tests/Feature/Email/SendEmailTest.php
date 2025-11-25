<?php

namespace Tests\Feature\Email;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SendEmailTest extends TestCase
{
    /**
     * Testing the Email Submission feature on ContactCore
     */
    public function test_sendEmail(): void
    {
        /*$response = $this->post('/api/email', [
            'firstname' => 'John',
            'lastname'  => 'Doe',
            'email'     => 'john@example.com',
            'subject'   => 'Hello',
            'message'   => 'Testing email feature'
        ]);

        $response->assertStatus(200);*/

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
    }
}
