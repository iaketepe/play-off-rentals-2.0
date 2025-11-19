<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PayController extends Controller {


    public function initializePayment(Request $request) {
        Stripe::setApiKey(config('cashier.secret'));
        
        $amount = $request->input('amount');

        if(!is_numeric($amount)) {
            return response()->json([ "error" => "Amount is not a valid number"], 400);
        }

        $paymentIntent = PaymentIntent::create([
            'amount' => $amount * 100,
            'currency' => 'cad',
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret,
            'stripePublicKey' => config('cashier.key'),
        ]);
    }
}