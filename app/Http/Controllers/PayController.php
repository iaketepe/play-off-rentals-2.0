<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PayController extends Controller {


    public function initializePayment(Request $request) {
        Stripe::setApiKey(config('cashier.secret'));

        $paymentIntent = PaymentIntent::create([
            'amount' => 2500,#$request->input('amount'),
            'currency' => 'cad',
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret,
            'stripePublicKey' => config('cashier.key'),
        ]);
    }
}