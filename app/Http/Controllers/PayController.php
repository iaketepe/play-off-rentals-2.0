<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PayController extends Controller {


    public function initializePayment(Request $request) {
        Stripe::setApiKey(config('cashier.secret'));

        $paymentIntent = PaymentIntent::create([
            'amount' => $request->input('amount') * 100,
            'currency' => 'cad',
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret,
            'stripePublicKey' => config('cashier.key'),
        ]);
    }
}