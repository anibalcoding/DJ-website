<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  exit("Method Not Allowed");
}

$name = trim(str_replace(["\r", "\n"], "", $_POST["name"] ?? ""));
$email = trim(str_replace(["\r", "\n"], "", $_POST["email"] ?? ""));
$phone = trim($_POST["phone"] ?? "");
$date = trim($_POST["date"] ?? "");
$type = trim($_POST["type"] ?? "");
$venue = trim($_POST["venue"] ?? "");
$notes = trim($_POST["notes"] ?? "");

if ($name === "" || $email === "" || $phone === "" || $date === "" || $type === "") {
  http_response_code(400);
  exit("Missing required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit("Invalid email.");
}

$host = strtolower($_SERVER["HTTP_HOST"] ?? "");
$host = preg_replace('/^www\./', '', $host);
$host = preg_replace('/[^a-z0-9\.\-]/', '', $host);
$fromEmail = ($host !== "" && strpos($host, ".") !== false)
  ? "no-reply@$host"
  : "no-reply@localhost";

$to = "bookshutitdown@gmail.com"; 
$subject = "New booking request from $name";
$body = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
$body .= "Event Date: $date\n";
$body .= "Event Type: $type\n";
$body .= "Venue: " . ($venue !== "" ? $venue : "N/A") . "\n";
$body .= "Notes:\n" . ($notes !== "" ? $notes : "N/A") . "\n";
$headers = "From: DJ Shutitdown <$fromEmail>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $body, $headers, "-f $fromEmail");
if (!$sent) {
  $sent = mail($to, $subject, $body, $headers);
}

if ($sent) {
  header("Location: index.html?booking=sent#contact");
  exit();
} else {
  http_response_code(500);
  error_log("Booking form mail() failed for host: " . ($host !== "" ? $host : "unknown"));
  echo "Failed to send. Please try again later.";
}
