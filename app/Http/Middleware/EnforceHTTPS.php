<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnforceHTTPS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the request is not secure (HTTP)
        if (!$request->secure()) {
            // Redirect to the HTTPS version of the current URL
            return redirect()->secure($request->getRequestUri());
        }
        
        return $next($request);
    }
}
