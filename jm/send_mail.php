<?php
  
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


// Checks if form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
 
    function post_captcha($user_response) { 
        $fields_string = '';
        $fields = array(
            'secret' => '6Lc5xwAaAAAAAMmQvb5lMqdvBP03dP-ZPHKHgK0R',
            'response' => $user_response
        );
        foreach($fields as $key=>$value)
        $fields_string .= $key . '=' . $value . '&';
        $fields_string = rtrim($fields_string, '&');

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);

        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }

    // Call the function post_captcha
    $res = post_captcha($_POST['g-recaptcha-response']);

   if (!$res['success']) {
        // What happens when the CAPTCHA wasn't checked
       
            http_response_code(400);
            ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
 
            echo "Please make sure you check the security CAPTCHA box!";
      
    } else {
    
        
require 'vendor/autoload.php';


$mail = new PHPMailer(true);

$name = $_POST['name'];
$subject = "Message from your website.";
$email = $_POST['email'];
$message = $_POST['message'];


try {
    //Server settings
    // $mail->SMTPDebug = 2;                                       // Enable verbose debug output
    $mail->isSMTP();                                  // Set mailer to use SMTP
    $mail->Host       = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'jmbp032697@gmail.com';                     // SMTP username
    $mail->Password   = 'IamJohnMatthew26';                               // SMTP password
    $mail->SMTPSecure = 'ssl';                                  // Enable TLS encryption, `ssl` also accepted
    $mail->Port       = 465;                                    // TCP port to connect to

    //Recipients
    //TURN ON FIRST THE LESS SECURE APPS ON GMAIL ACCOUNT
    $mail->setFrom('from@jmperez.coolpage.biz', 'JM Perez Website');
    $mail->addAddress('jmbp032697@gmail.com', 'JM Perez Website');     // Add a recipient
    $mail->addReplyTo($email, 'Visitor');
    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body  = "<b>Name: </b>" . $name . "<br/>";
    $mail->Body .= "<b>Email: </b>" . $email ."<br/>";
    $mail->Body .= "<b>Message: </b>" . $message;
    
    
   // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent!';
} catch (Exception $e) {

    http_response_code(400);
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
    }
}   ?>