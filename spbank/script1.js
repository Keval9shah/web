var pf = document.getElementsByClassName("pf")[0];
var tr = document.getElementsByClassName("tr")[0];
var th = document.getElementsByClassName("th")[0];
var ul = document.getElementsByClassName("ul")[0];
var sel = document.getElementsByClassName("sel")[0];
var nav = document.getElementsByClassName("navigation")[0];
var exm = document.getElementsByClassName("extra_maal")[0];

window.addEventListener('resize', () => {
    prfl();
});

var balance = <?php echo $row['balance'];?>;
var acc_no = <?php echo $row['acc_no'];?>;
// var acc_string=acc_no.toString();
// var imgs=["0.jpg","1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"];

// function addAccImages(){
// var images="";
//     for(i=0;i<8;i++){
//         images+="<img class='accimg' src='"+imgs[acc_string[i]]+"'>";
//     }
//     document.getElementsByClassName("acc_no")[0].innerHTML=images;
// }
// addAccImages();



var wdth = pf.offsetWidth + tr.offsetWidth + th.offsetWidth + ul.offsetWidth + 34;

nav.style.width = wdth + "px";

prfl();
trht();
// usli();
function prfl() {
    tr.classList.remove("sel1");
    th.classList.remove("sel1");
    ul.classList.remove("sel1");
    pf.classList.add("sel1");

    sel.style.left = pf.offsetLeft + "px";
    sel.style.width = pf.offsetWidth + "px";

    exm.innerHTML = "<div class='profile'><div class='hi'>Hi,<?php echo ' ',$name; ?></div><div class='acc_no'><mark class='accn'><?php echo $acc_no; ?></mark></div><br><div class='bal'>Balance <mark class='bala'>₹<?php $balance=mysqli_fetch_assoc(mysqli_query($con,"
    SELECT balance FROM user WHERE acc_no = '$acc_no'
    "))['balance']; echo $balance; ?></mark</div></div>";

    const accn = document.getElementsByClassName("accn")[0];
    accn.onclick = function() { document.execCommand("copy"); }
    accn.addEventListener("copy", function(event) {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", accn.textContent);
            // console.log(event.clipboardData.getData("text"))
            alert("Account no copied to clipBoard");
            accn.style.cursor = "text";
        } else {
            alert("not copied");
        }
    });
}

function trct() {
    pf.classList.remove("sel1");
    th.classList.remove("sel1");
    ul.classList.remove("sel1");
    tr.classList.add("sel1");

    sel.style.left = tr.offsetLeft + "px";
    sel.style.width = tr.offsetWidth + "px";

    exm.innerHTML = "<div class='receipt'><div class='receipt-list'><div class='fields'><div class='flbal'>your balance <br><div class='flbal1'>₹<span><?php $balance=mysqli_fetch_assoc(mysqli_query($con,"
    SELECT balance FROM user WHERE acc_no = '$acc_no'
    "))['balance']; echo $balance; ?></span></div></div><form action='trandata.php' method='POST'><div class='receiver fl'><div class='field'>Email/Account no.</div><div class='answer'><input id='rec' minlength='3' maxlength='30' name='receiver' required placeholder='Ex@xyz.com or 10080085'></div></div><div class='flx'><div class='amount fl'><div class='field'>Amount</div><div class='answer'><input id='ana' maxlength='10' static='' name='amount' required placeholder='Enter Amount'></div></div><div class='go fl'><button onclick='' name='submit' type='submit' class='pay'>Pay <svg width='16px' height='15px' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path fill='currentColor' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'></path></svg></button></div></div></form></div></div></div>";
}

function trht() {
    tr.classList.remove("sel1");
    pf.classList.remove("sel1");
    ul.classList.remove("sel1");
    th.classList.add("sel1");

    sel.style.left = th.offsetLeft + "px";
    sel.style.width = th.offsetWidth + "px";

    exm.innerHTML = "<?php $result = mysqli_query($con,"
    SELECT * FROM transaction WHERE acc_no = '$acc_no'
    ORDER BY datetime DESC "); ?><div class='containerx'><ul class='responsive-table'><li class='table-header'><div class='col col-1'>Date</div><div class='col col-2'>To/From</div><div class='col col-3'>Amount</div><div class='col col-4'>Balance</div> </li><?php while($rows=$result->fetch_assoc()) { ?><li class='table-row'><div class='col col-1'><?php echo date_format(date_create($rows['datetime']),'d/m/y  h:i A');?></div><div class='col col-2'><?php echo $rows['s_name'];?></div><?php $am = intval($rows['amount']); if($am>0){echo " < div class = 'col col-3 positive' > "; echo $am; echo " < /div>";}else { echo "<div class='col col-3 negative'>"; echo $am; echo "</div > "; }  ?><div class='col col-4'><?php echo $rows['current_bal'];?></div></li><?php } ?></ul></div>";
}

function usli() {
    tr.classList.remove("sel1");
    th.classList.remove("sel1");
    pf.classList.remove("sel1");
    ul.classList.add("sel1");

    var wth = ul.offsetWidth + 5;
    sel.style.left = ul.offsetLeft + "px";
    sel.style.width = wth + "px";

    exm.innerHTML = "<?php $result = mysqli_query($con,"
    SELECT id, name, email, acc_no FROM user "); ?><div class='containerx'><ul class='responsive-table'><li class='table-header'><div class='cola cola-1'>No</div><div class='cola cola-2'>Name</div><div class='cola cola-3'>Email</div><div class='cola cola-4'>Account No</div> </li><?php while($rows=$result->fetch_assoc()) { ?><li class='table-row'><div class='cola cola-1'><?php echo $rows['id'];?></div><div class='cola cola-2'><?php echo $rows['name'];?></div><div class='cola cola-3'><?php echo $rows['email']; ?></div><div class='cola cola-4'><?php echo $rows['acc_no'];?></div></li><?php } ?></ul></div>";

}