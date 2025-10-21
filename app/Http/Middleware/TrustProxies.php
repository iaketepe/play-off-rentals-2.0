<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Symfony\Component\HttpFoundation\Request;
use Illuminate\Support\Facades\Log;


class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array|string|null
     */
    protected $proxies = '*'; // trust all proxies

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers = Request::HEADER_X_FORWARDED_FOR
                         | Request::HEADER_X_FORWARDED_HOST
                         | Request::HEADER_X_FORWARDED_PORT
                         | Request::HEADER_X_FORWARDED_PROTO;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, \Closure $next)
    {
        // You don't need to override this unless you're doing something custom.
        // However, logging here can help with debugging:
        Log::info('X-Forwarded-Proto: ' . $request->header('X-Forwarded-Proto'));

        if ($request->header('X-Forwarded-Proto') !== 'https' && $request->getScheme() !== 'https') {
            $request->setScheme('https');
        }

        // Trust the proxy and continue
        return parent::handle($request, $next);
    }
}
