<html>
    <body>
        <?php

$username = $_POST ['Username'];
$password = $_POST['Password'];

if ($username && $password)
 {

 $connect = mysql_connect("localhost", "root", "root") or die ("couldn't connect");

 mysql_select_db("sportsday") or die ("couldn't find db");

 }

 else 
 die("Please enter a username and password");

?>
    </body>
</html>