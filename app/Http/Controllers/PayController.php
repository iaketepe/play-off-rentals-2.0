<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PayController extends Controller {

    private $circleCoordinates = [45.409, -75.7171];
    private $radius = 10000;

    function haversineDistance($lat1, $lon1, $lat2, $lon2, $unit = 'm') {
        $earthRadius = 6371000; // in meters

        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);

        $dLat = $lat2 - $lat1;
        $dLon = $lon2 - $lon1;

        $a = sin($dLat/2) * sin($dLat/2) +
            cos($lat1) * cos($lat2) *
            sin($dLon/2) * sin($dLon/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));

        $distance = $earthRadius * $c;

        if ($unit === 'km') return $distance / 1000;
        if ($unit === 'mi') return $distance / 1609.34;
        return $distance; // meters
    }


    public function checkValidLocation($coordinates) {
        /*$a = ($coordinates[0] - $this->circleCoordinates[0]) * pi() / 180;
        $b = ($coordinates[1] - $this->circleCoordinates[1]) * pi() / 180;
        $distance = sqrt($a^2 + $b^2);*/
        $distance = $this->haversineDistance($this->circleCoordinates[0], $this->circleCoordinates[1], $coordinates[0], $coordinates[1]);
        return $distance <= $this->radius;
    }

    public function initializePayment(Request $request) {
        Stripe::setApiKey(config('cashier.secret'));
        
        $validated = $request->validate([
            'amount' => 'required|numeric',
            'coordinates' => 'required|array'
        ]);

        //dd($this->checkValidLocation($validated['coordinates']));

        if(!$this->checkValidLocation($validated['coordinates'])) {
            //return response()->json(["error" => "Location is out of range"], 400);

            $paymentIntent = PaymentIntent::create([
                'amount' => $validated['amount'] * 100,
                'currency' => 'cad',
                'confirmation_method' => 'manual',
                'capture_method' => 'manual',
                'metadata' => [
                    'ignored' => true,
                ],
            ]);

            $paymentIntent->cancel(); // Prevent accidental confirmation

            return response()->json([
                "error" => "Location is not in range",
                'clientSecret' => $paymentIntent->client_secret,
                'stripePublicKey' => config('cashier.key'),
            ], 400);
        }

        $paymentIntent = PaymentIntent::create([
            'amount' => $validated['amount'] * 100,
            'currency' => 'cad',
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret,
            'stripePublicKey' => config('cashier.key'),
        ]);
    }
}