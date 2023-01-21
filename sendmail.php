<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'vendors/phpmailer/src/Exception.php';
    require 'vendors/phpmailer/src/PHPMailer.php';
    require 'vendors/phpmailer/src/SMTP.php';


    $mail = new PHPMailer(true);

    try {
        $mail->CharSet = 'UTF-8';
        $mail->setLanguage('ru', 'vendors/phpmailer/language/');
        $mail->IsHTML(true);
    
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;  
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPDebug = 0;
        $mail->Host = 'smtp.yandex.ru';
        $mail->SMTPSecure = 'ssl';
        $mail->Username = 'testEmail4work@yandex.ru';
        $mail->Password = 'ifodxnldvzpahocm';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;    
        $mail->Port = 465;
    
        // От кого письмо
        $mail->setFrom('testEmail4work@yandex.ru', 'Иван Иванов');
        // Кому отправить
        $mail->addAddress('testEmail4work@yandex.ru');
        // Тема письма
        $mail->Subject = 'Тестовое письмо';
    
        // Тело письма
        $body = '<h1>Это тестовое письмо</h1>';
    
        if (trim(!empty($_POST['username']))) {
            $body.='<p><Strong>Имя:</strong> '.$_POST['username'].'</p>';
        }
        if (trim(!empty($_POST['useremail']))) {
            $body.='<p><Strong>Почта:</strong> '.$_POST['useremail'].'</p>';
        }
        if (trim(!empty($_POST['usernumber']))) {
            $body.='<p><Strong>Телефон:</strong> '.$_POST['usernumber'].'</p>';
        }
        $mail->Body = $body;
    
        $mail->send();
        $message = 'Данные отправлены';
        $response = ['message' => $message];
    
        header('Content-type: application/json');
        echo json_encode($response); 
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

?>