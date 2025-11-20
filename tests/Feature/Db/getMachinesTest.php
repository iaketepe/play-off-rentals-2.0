<?php

namespace Tests\Feature\Db;

use Tests\TestCase;

class getMachinesTest extends TestCase
{
    /**
     * Testing the return of arcade machines as a list for the RentTwo Component
     */
    public function test_getMachines(): void
    {

        $response = $this->get('/api/machines');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                "id",
                "name",
                "description",
                "cost",
                "image_path",
                "description_fr"
            ]
        ]);
    }
}
