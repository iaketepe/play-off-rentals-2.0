<?php

namespace Tests\Feature\Pay;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class InitializePaymentTest extends TestCase
{
    /**
     * Testing the payment process on the RentThree Component
     */
    public function test_initializePayment(): void
    {
        $response = $this->postJson('/api/payment', [
            'amount' => '15.25',
            'coordinates' => ['45.409', '-75.7171']
        ]);

        $response->assertStatus(200);

        $response = $this->postJson('/api/payment', [
            'amount' => 'a28.00',
            'coordinates' => ['45.409', '-75.7171']
        ]);

        $response->assertStatus(422);

        $response = $this->postJson('/api/payment', [
            'amount' => '28.00',
            'coordinates' => 24
        ]);

        $response->assertStatus(422);

    }
}
