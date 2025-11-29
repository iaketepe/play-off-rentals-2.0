<?php

namespace Tests\Feature\Map;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetTilesTest extends TestCase
{
    /**
     * Testing the return of raster tiles for RentOne Component
     */
    public function test_getTiles(): void
    {
        $response = $this->getJson('/api/map/tiles/10/10/10.png');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'image/png');


        $response = $this->getJson('/api/map/tiles/a/10/10.png');

        $response->assertStatus(400);
    }
}
