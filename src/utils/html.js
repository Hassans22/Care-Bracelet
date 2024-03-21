export const TempForgetPassword =(firstName,code)=>
`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  
  <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    table {
      width: 100%;
      height: 100vh;
      display: table;
      text-align: center; /* Center align all content */
    }

    .main {
      display: table-cell;
      vertical-align: middle;
    }

    .elements {
      width: 50%;
      margin: 0 auto;
    }

    .elements h1 {
      font-size: 70px;
      margin-bottom: 10px;
      color: #800080;
    }

    .elements i {
      margin-bottom: 40px;
      font-size: 50px;
      color: #d02525;
    }

    .elements a {
      margin-bottom: 30px;
      font-size: 30px;
      text-decoration: none;
      color: gray;
      display: block;
    }

    .func {
      width: 25%;
      height: 40px;
      font-size: 15px;
      color: red;
      margin: auto;
      font-weight: 600;
      background-color: #f0f0f0;
      line-height: 40px;
      border-radius: 5px;
    }

    .elements p {
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <td class="main">
        <div class="elements">
          <h2>Hello ${firstName}</h2>
          <a href="#"><img style="display:revert-layer;height:auto;width:125px;max-width:100%;box-sizing:border-box;border-width:0" width="125" class="CToWUd" data-bit="iit" align src="https://res.cloudinary.com/dna1fzuwy/image/upload/v1710941244/WhatsApp_Image_2024-03-19_at_04.51_1_htcuvw.png" alt="...."/></a>
          <i class="fa-brands fa-google"></i>
          <p class="text1">Reset your password</p>
          <p class="text2">use this code to confirm your new password</p>
          <br/>
          <div class="func">${code}</div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
export const TempConfirmationEmail =(firstName,code)=>
`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  
  <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    table {
      width: 100%;
      height: 100vh;
      display: table;
      text-align: center; /* Center align all content */
    }

    .main {
      display: table-cell;
      vertical-align: middle;
    }

    .elements {
      width: 50%;
      margin: 0 auto;
    }

    .elements h1 {
      font-size: 70px;
      margin-bottom: 10px;
      color: #800080;
    }

    .elements i {
      margin-bottom: 40px;
      font-size: 50px;
      color: #d02525;
    }

    .elements a {
      margin-bottom: 30px;
      font-size: 30px;
      text-decoration: none;
      color: gray;
      display: block;
    }

    .func {
      width: 25%;
      height: 40px;
      font-size: 15px;
      color: red;
      margin: auto;
      font-weight: 600;
      background-color: #f0f0f0;
      line-height: 40px;
      border-radius: 5px;
    }

    .elements p {
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <td class="main">
        <div class="elements">
          <h2>Welcome to</h2>
          <a href="#"><img style="display:revert-layer;height:auto;width:125px;max-width:100%;box-sizing:border-box;border-width:0" width="125" class="CToWUd" data-bit="iit" align src="https://res.cloudinary.com/dna1fzuwy/image/upload/v1710941244/WhatsApp_Image_2024-03-19_at_04.51_1_htcuvw.png" alt="Care Bracelet"/></a>
          <i class="fa-brands fa-google"></i>
          <p class="text1">Thank You for signing up ${firstName}</p>
          <p class="text2">Please enter this code to verify your email.</p>
          <br/>
          <div class="func">${code}</div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;


























 