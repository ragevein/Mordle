<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mordle - Better then Wordle</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
</head>
<?php 
    session_name('4hammers');
    session_start();
    $now = date('Y-m-d');
    $link = mysqli_connect("localhost", "radmin", "OtENi66smQs0c5Ly*", "4hammersforge");

    $sql = "SELECT * FROM mordle WHERE m_date = '".$now."'";
    if($result = mysqli_query($link, $sql)){
        $numrows = mysqli_num_rows($result);
        if ($numrows < 1){
            $sql = "SELECT * FROM mordle WHERE m_done = 0 ORDER BY RAND() LIMIT 1 ";
            $result = mysqli_query($link, $sql);
            $row = mysqli_fetch_array($result);
            $word = $row['m_word'];
            $sql = "UPDATE mordle SET m_date = '".$now."', m_done = 1 WHERE m_word = '".$row['m_word']."'";
            $result = mysqli_query($link, $sql);
        } else {
            $row = mysqli_fetch_array($result);
            $word = $row['m_word'];
        }

    }
?>
<script type="text/javascript">
    var word = "<?php echo"$word"?>";
</script>
<body>
    <div class="scroller" id="scroller">Hey, word guesses are now being validated.<br></div>
    <div class="container" id="container">
        <div class="header"><hr>
            <span class="icon"><img src="../img/icons/rules.png" class="icon" id="news"></span>
            <div class="title"><h1>Mordle</h1><span class="small">v1.46</span></div><hr></div>
        
            <div id="list" class="list">
                <div class="word" id="w1">
                    <div class="letter" id="w1L0"></div>
                    <div class="letter" id="w1L1"></div>
                    <div class="letter" id="w1L2"></div>
                    <div class="letter" id="w1L3"></div>
                    <div class="letter" id="w1L4"></div>
                </div>
                <div class="word" id="w2">
                    <div class="letter" id="w2L0"></div>
                    <div class="letter" id="w2L1"></div>
                    <div class="letter" id="w2L2"></div>
                    <div class="letter" id="w2L3"></div>
                    <div class="letter" id="w2L4"></div>
                </div>
                <div class="word" id="w3">
                    <div class="letter" id="w3L0"></div>
                    <div class="letter" id="w3L1"></div>
                    <div class="letter" id="w3L2"></div>
                    <div class="letter" id="w3L3"></div>
                    <div class="letter" id="w3L4"></div>
                </div>
                <div class="word" id="w4">
                    <div class="letter" id="w4L0"></div>
                    <div class="letter" id="w4L1"></div>
                    <div class="letter" id="w4L2"></div>
                    <div class="letter" id="w4L3"></div>
                    <div class="letter" id="w4L4"></div>
                </div>
                <div class="word" id="w5">
                    <div class="letter" id="w5L0"></div>
                    <div class="letter" id="w5L1"></div>
                    <div class="letter" id="w5L2"></div>
                    <div class="letter" id="w5L3"></div>
                    <div class="letter" id="w5L4"></div>
                </div>
                <div class="word" id="w6">
                    <div class="letter" id="w6L0"></div>
                    <div class="letter" id="w6L1"></div>
                    <div class="letter" id="w6L2"></div>
                    <div class="letter" id="w6L3"></div>
                    <div class="letter" id="w6L4"></div>
                </div>

            </div>
    <div class="container">
    <div class="keyboard">
        <div class="keys" id="q">Q</div>
        <div class="keys" id="w">W</div>
        <div class="keys" id="e">E</div>
        <div class="keys" id="r">R</div>
        <div class="keys" id="t">T</div>
        <div class="keys" id="y">Y</div>
        <div class="keys" id="u">U</div>
        <div class="keys" id="i">I</div>
        <div class="keys" id="o">O</div>
        <div class="keys" id="p">P</div>
    </div>    
    <div class="keyboard">
        <div class="keys" id="a">A</div>
        <div class="keys" id="s">S</div>
        <div class="keys" id="d">D</div>
        <div class="keys" id="f">F</div>
        <div class="keys" id="g">G</div>
        <div class="keys" id="h">H</div>
        <div class="keys" id="j">J</div>
        <div class="keys" id="k">K</div>
        <div class="keys" id="l">L</div>
    </div>  
    <div class="keyboard">
        <div class="keys enterkey" id="enter">ENTER</div>
        <div class="keys" id="z">Z</div>
        <div class="keys" id="x">X</div>
        <div class="keys" id="c">C</div>
        <div class="keys" id="v">V</div>
        <div class="keys" id="b">B</div>
        <div class="keys" id="n">N</div>
        <div class="keys" id="m">M</div>
        <div class="keys backkey" id="back">Back</div>
    </div>  
    </div>
    </div>
    <dialog class="modal" id="modal">
        <div class="padded"><button class="close-button" id="close-button">X</button>
            <div id="gameResult"></div>
            <div class="deets">Stats:</div>
            <div class="deets" id="fatDump"></div>
            <div class="deets" id="def">Definition:</div>
            <div class="deets" id="use">Usage:</div>
            <div class="deets" id="auth">Auth:</div>
            <div id="countDown" class="deets">Next Mordle: </div>
        </div>
    </dialog>
    <dialog class="modal" id="modal2">
        <div class="padded">
            <div><p>News and current state of the game.</p><button class="close-button" id="close-button2">X</button></div>
            <ul>
            
            <li>Tracking of your progress and stats.</li>
            <li>Add hardcore options n theme options</li>
            <li>More or less then 5 letter words and possibly phrases</li>
            <li>Add keyboard support</li>
            <li><strike>Actually check if your guessed word is an actual word.<br>First attempt wasn't a good way to go about it.<br>Working on a better solution.</strike></li>
            <li><strike>Add loser screen.</strike></li>
            <li><strike>Tweak to letter colors to not trick paul again.</strike></li>
            <li><strike>Cookies working remembers progress.</strike></li>
            <li><strike>New word generated everyday at midnight.</strike></li>
            
            </ul>
            </div>
    </dialog>
</body>
<script src="script.js"></script>
</html>