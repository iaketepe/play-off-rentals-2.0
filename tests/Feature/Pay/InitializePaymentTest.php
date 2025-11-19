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
        $response = $this->post('/api/payment?amount=' . urlencode('15.25'));

        $response->assertStatus(200);

        $response = $this->post('/api/payment?amount=' . urlencode('a28.00'));

        $response->assertStatus(400);

        $response = $this->post('/api/payment?amount=' . urlencode('35.00'));

        $response->assertStatus(200);

        $response = $this->post('/api/payment?amount=' . urlencode('1000.00'));

        $response->assertStatus(200);

    }
}
