<?php

function respond($code = 200, $payload = [])
{
    header('Content-Type: application/json');

    if (!empty($payload)) {
        echo json_encode($payload);
    }

    http_response_code($code);
}

switch ($_GET['code']) {
    case '401':
        respond(401, ["error" => "token not provided"]);
        break;
    case '422':
        respond(422, ["email" => "the email field is required"]);
        break;
    case '500':
        respond(500, ["error" => "broke all the things"]);
        break;
    case '500_noJson':
        respond(500);
        break;
    case '404':
        respond(404, ["error" => "resource not found"]);
        break;
    case '200':
        respond(200, ["hello" => "world"]);
        break;
    case '200_noJson':
        respond(200);
        break;
}
