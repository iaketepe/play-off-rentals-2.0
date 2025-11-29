<?php

namespace Tests\Feature\Map;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AutoCompleteTest extends TestCase
{
    /**
     * Testing the automatic map search result request for the RentOne component
     */
    public function test_autocomplete(): void
    {
        $response = $this->get('/api/map/locations?query=' . urlencode('University of Ottawa'));

        $response->assertStatus(200);


        $response = $this->get('/api/map/locations?query=' . urlencode('University of toorontoo'));

        $response->assertStatus(200);

        $response = $this->get('/api/map/locations?query=' . urlencode('asdfklamswd;flaksmwflkasdmfalksdfmw;omsfmas;lkfmawse;ofslfse;lkf'));
        $response->assertJson([]);

        $response = $this->get('/api/map/locations?query=' . urlencode(''));
        $response->assertJson([]);
    }
}
