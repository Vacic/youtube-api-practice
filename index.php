<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube API Practice</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <script src="https://kit.fontawesome.com/52a318e741.js" cross-site="Secure"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="black">
        <div class="nav-wrapper">
            <div class="container">
                <a href="#!" class="brand-logo">YouTube API Practice</a>
            </div>
        </div>
    </nav>
    <br>
    <section>
        <div class="container">
            <p>Log In With Google</p>
            <button class="btn red" id="authorize-button">Log In</button>
            <button class="btn red" id="signout-button">Log Out</button>
            <br>
            <div id="content">
                <div class="row">
                    <div class="col s6">
                        <form id="channel-form">
                            <div class="input-field">
                                <input type="text" placeholder="Enter Channel Name" id="channel-input">
                                <input type="submit" value="Get Channel Data" class="btn grey lighten-2">
                            </div>
                        </form>
                    </div>
                    <div class="col s6" id="channel-data"></div>
                </div>
                <div class="row" id="video-container"></div>
            </div>
        </div>
    </section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="script.js"></script>
    <script async defer src="https://apis.google.com/js/api.js" onload="this.onload=function(){};handleClientLoad()" onreadystatechange="if(this.readyState === 'complete') this.onload()"></script>
</body>
</html>