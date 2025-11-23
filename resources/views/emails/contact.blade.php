<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Someone sent a message</title>
</head>
<body>
    <h1>Hello,</h1>

    <p>{{ $message_text }}</p>

    <p>Thanks,<br>{{ $first_name }} {{ $last_name }}</p>

    <hr>

    <h1>Bonjour,</h1>

    <p>{{ $message_text }}</p>

    <p>Merci,<br>{{ $first_name }} {{ $last_name }}</p>
</body>
</html>
