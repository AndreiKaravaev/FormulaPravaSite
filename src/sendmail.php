<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    $mail = new PHPMailer(true);        // "true" включает работу исключений (exceptions)
    
        //Настройки сервера
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;        // "2" включает подробный вывод отладки. Отключить - "0"
        $mail->isSMTP();        // Включаем SMTP
        $mail->Host = 'smtp.gmail.com';        // задаем адрес SMTP сервера
        $mail->SMTPAuth = true;        // Включаем SMTP аутентификацию
        $mail->Username = 'f.pravo7@gmail.com';        // имя пользователя
        $mail->Password = 'prpiitttvyustimk';        // Пароль (https://myaccount.google.com/apppasswords)
        $mail->SMTPSecure = 'ssl';        // Включаем SSL шифрование (или можно TLS для порта 587)
        $mail->Port = 465;        // Порт для подключения
    
        //Задаем получателей
        $mail->setFrom('f.pravo7@gmail.com', 'Your site');        //Задаем адрес и имя отправителя
        $mail->addAddress('akar9801@gmail.com', 'Gmail User');        // И адрес и имя получателя
        $mail->Subject = 'Письмо заказа звонка с сайта';
        
    
   
   
   
    // // от кого

    // $mail->setForm('karavaev-adv@yandex.ru', 'отправка с сайта');
    // // кому отправить
    // $mail->addAddress('F.prava-uk@yandex.ru');
    // // тема письма
        $mail->Charset = 'UTF-8';
        $mail->setLanguage('ru', 'phpmailer/language');
        $mail->IsHTML(true);
        // тело письма
        $body = '<h1>Вам пришла просьба перезвонить с вашего сайта</h1>';

    if(trim(!empty($_POST['names']))){
        $body.='<p><strong>Имя:</stong> '.$_POST['names'].'</p>';
    }
    if(trim(!empty($_POST['phone']))){
        $body.='<p><strong>Телефон:</stong> '.$_POST['phone'].'</p>';
    }
    if(trim(!empty($_POST['check']))){
        $body.='<p><strong>Согласие на обработку персональных данных:</stong> '.$_POST['check'].'</p>';
    }

    $mail->Body = $body;

    // отправка

    if (!$mail->send()){
        $message = 'Ощибка';
    } else{
        $message = 'Данные отправлены';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
    ?>



    

