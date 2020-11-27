export const emailConfirmationTemplate = (username, link) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="en" data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap" rel="stylesheet">

  <style>
    .confirmation {
      display: grid;
      background: #f9f9f9;
      border-radius: 10px;
      padding: 24px 3% 48px;
    }
  </style>

</head>

<body>
  <div>

    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 2%;">
      <div class="confirmation">

        <img src="https://res.cloudinary.com/ojay-dev/image/upload/v1606498918/pharmafind/logo_mvhfl8.png" alt="logo"
          style="display:flex; margin: auto;">



        <div style="background: #FFFFFF;border-radius: 10px;padding: 0 3%;margin-top: 27px;text-align: center;">
          <img src="https://res.cloudinary.com/ojay-dev/image/upload/v1606498918/pharmafind/hero_vs4ypi.png" alt="hero"
            width="100%">

          <h1
            style="font-family: Karla;font-style: normal;font-weight: bold;font-size: 38px;line-height: 50px;color: #464855;margin: 28px 0 20px;">
            Hi, ${username}
          </h1>

          <p
            style=" font-family: Karla;font-style: normal;font-weight: normal;font-size: 18px;line-height: 21px;text-align: center;color: #464855;max-width: 489px;margin: 0 auto 32px;">
            To confirm your email address, click on the button below or copy and paste the link below into your browser.
          </p>



          <span
            style="font-family: Karla;font-style: normal;font-weight: normal;font-size: 14px;line-height: 14px;text-align: center;color: #333;display: block;max-width: 356px;text-align: center;margin: auto;">
            ${link}
          </span>


          <div style="margin-top: 45px; margin-bottom: 71px;">
            <a href=${link}
              style=" font-family: Karla;font-style: normal;font-weight: normal;font-size: 16px;line-height: 19px;color: #FFFFFF;background: linear-gradient(270deg, #2B9B47 0%, #56BBEC 100%);box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.09);border-radius: 10px;padding: 10px 22px;text-decoration: none;">
              Verify Email
            </a>
          </div>

        </div>

      </div>
    </div>
  </div>

</body>

</html>`;
