<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="token" content="{{ csrf_token() }}">
  <link rel="icon" type="img/ico" href="{{ asset('images/favicon.ico') }}">
  <title>CÔNG TY TNHH MTV THƯƠNG MẠI DỊCH VỤ ĐỖ AN</title>
  <link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap.min.css') }}">
 <!--  <link rel="stylesheet" type="text/css" href="{{ asset('css/fontawesome.min.css') }}"/> -->
 <link rel="stylesheet" type="text/css" href="{{ asset('font/css/font-awesome.min.css') }}"/>
  <!-- <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet"> -->
  <link rel="stylesheet" type="text/css" href="{{ asset('css/homepage.css') }}">
</head>
<body>
  @yield('content')
  
  <script type="text/javascript" src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
  <script type="text/javascript" src="{{ asset('js/popper.min.js') }}"></script>
  <script type="text/javascript" src="{{ asset('js/bootstrap.min.js') }}"></script>
  <script type="text/javascript" src="{{ asset('js/axios.min.js') }}"></script>
  <script type="text/javascript">
    const token = $('[name="token"]').attr('content');
  </script>
  @yield('script-block')
</body>
</html>