<?php

namespace Tests\Feature\Map;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MetaDataTest extends TestCase
{
    /**
     * Testing the map metadata request for RentOne component
     */
    public function test_tileMetaData(): void
    {
        $response = $this->get('/api/map/tiles/metadata');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'urlHotline',
            'attribution'
        ]);

        $json = $response->json();
        $this->assertNotEmpty($json['urlHotline']);
        $this->assertNotEmpty($json['attribution']);

    }
}
