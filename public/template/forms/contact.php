<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Receiving email address
  $receiving_email_address = 'rey@reyortiz.es';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;

  $contact->to = $receiving_email_address;

  // Always send with a fixed subject
  $contact->subject = 'Contact Form';

  // Use sender info from form
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];

  // SMTP (Zoho EU). DO NOT hardcode credentials; use env vars.
  // Set these in your hosting environment:
  //   ZOHO_SMTP_USER=rey@reyortiz.es
  //   ZOHO_SMTP_PASS=<your Zoho app password>
  $smtpUser = getenv('ZOHO_SMTP_USER');
  $smtpPass = getenv('ZOHO_SMTP_PASS');

  if ($smtpUser && $smtpPass) {
    $contact->smtp = array(
      'host' => 'smtppro.zoho.eu',
      'username' => $smtpUser,
      'password' => $smtpPass,
      'port' => '587'
    );
  }

  $contact->add_message($_POST['name'], 'From');
  $contact->add_message($_POST['email'], 'Email');
  $contact->add_message($_POST['message'], 'Message', 10);

  echo $contact->send();
?>
