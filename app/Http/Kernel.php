<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        // other global middleware
        //\App\Http\Middleware\TrustProxies::class,
        //'App\Http\Middleware\TrustProxies',
        \App\Http\Middleware\EnforceHTTPS::class,

    ];

    protected $middlewareGroups = [
        /*'web' => [
            // web middleware here
        ],*/

        'api' => [
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];
}
