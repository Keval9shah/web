const textArray = [
  "away name to to make play few than work light all last but small try answer time this next would really earth to see like tree each leave another year sun did all ask almost young the big men has a always even once carry new help best little think small must play carry saw why look day animal again for cut no earth or far first year few start will feet as name went face after out him animal cut large help change by here good say same",
  "life great her a tell put I where off us stop four and learn also were may four after high talk three why day into number but made as he may second miss our write think two let close plant just study number other sea her only leave by their letter second really which found state and far want then do found thing change mile play way them black line each water state us follow not sun girl water keep where took learn but large here people house with the",
  "with oil country at move new make as live kind now be us letter leave show must watch when house next after night at look set large again thing sound need around letter each close but time until house well their a book country song now take far went no family water his four tell have around might again in made he family hard name black group animal that about place make play food later thing there play close than life those have are long old face being open number",
  "then hand really carry went hand side spell seem went open it because form own large best mile after back also song important may has of if very at end page us why had right your to earth into call just live sun kind war would go little talk part next why now began like mile often our close in second into oil the point take animal time water school at where think mile good me many mother while most fall paper men even right see both white four idea",
  "took on life when kind need never along his who sun big name once their far try see just before until their answer enough walk carry boy stop below year give under page into each see sometimes what old move why state animal list no city every get sun both sea about how we you study home above sun number off was did fall help show back old hear begin man head white should father live often far small should group talk by while night small add at like he",
  "point out and after not change right look our along letter but ask only seem begin people before need river any only watch let do may add school do when said up put hard around be oil some did take paper an year or his as as help first until start most back what too are line been hard year man air small below sound name said how number add sea group take between cut above give letter country follow boy has last song say after got call school page",
  "head move home began we fire no these once upon long see might call and cut four every red white leave without so girl can long went open letter too until why my spell those say two day are think group important head not good group second was up have learn part your get large talk him try here feet start same know water tell can try word start up talk air good people is tree food him most use book did but hand be old put name book come",
];
const tarea = <HTMLTextAreaElement>document.querySelector("#tarea");
const submit = <HTMLButtonElement>document.querySelector("#submit");
const textdiv = <HTMLElement>document.querySelector("#text");
const timer = <HTMLElement>document.querySelector("section");
const wpmsc = <HTMLElement>document.querySelector("#wpmscore");

var scoreval = 0;
var start = 0;
var time = 0;

var incr = 0;
var text = "";
mainFn();
var timeInterval: number;
function mainFn() {
  text = textArray[incr % 7];
  // var str = "";
  // for (i = 0; i < text.length; i++) {
  //   str += "<letter>" + text[i] + "</letter>";
  // }
  // tarea.disabled=true;
  tarea.focus();
  tarea.value = "";
  var pointer = 0;
  var newLength = text.length;
  let textspans = "";
  for (let i = 0; i < text.length; i++) {
    textspans += "<span>" + text[i] + "</span>";
  }
  textdiv.innerHTML = textspans + "<div class='empty'></div>";
  // color=["thistle","bisque","cornsilk","gainsboro","lemonchiffon","moccasin","seashell","mistyrose"];
  var spans = textdiv.getElementsByTagName("span");
  tarea.onkeydown = (e) => {
    pointer = tarea.value.length + 1;
    if (e.key === text[pointer - 1]) {
      scoreval += 1;
    } else if (e.key === "Backspace" && pointer > 1) {
      if (scoreval > 0 && text[pointer - 2] === tarea.value[pointer - 2]) {
        scoreval -= 1;
      }
      spans[pointer - 2].style.color = "#444444";
      spans[pointer - 2].style.backgroundColor = "";
    } else if (e.key.charCodeAt(0) >= 32 && e.key.charCodeAt(0) <= 126) {
      spans[pointer - 1].style.color = "#5d3123";
      spans[pointer - 1].style.backgroundColor = "#5d3123";
    }
    // document.querySelector("body").style.backgroundColor=color[scoreval%8];
    if (scoreval === newLength) {
      setTimeout(submitfn, 200);
    }
    if (start === 0) {
      start = 1;
      timeInterval = setInterval(() => {
        time += 1;
        wpmsc.innerHTML =
          Math.floor((scoreval * 12) / Math.max(1, time)).toString() + " wpm";
        if (time > 60) {
          timer.innerHTML =
            Math.floor(time / 60).toString() +
            "m " +
            (time % 60).toString() +
            "s";
        } else {
          timer.innerHTML = time.toString() + "s";
        }
      }, 1000);
    }
    if (tarea.selectionStart === tarea.selectionEnd) {
      tarea.scrollTop = tarea.scrollHeight;
    }
  };
}

tarea.onscroll = () => {
  textdiv.scrollTop = tarea.scrollTop;
};

function preventDefaultForScrollKeys(e: KeyboardEvent) {
  if (
    e.key.charCodeAt(0) === 13 ||
    e.key.charCodeAt(0) === 37 ||
    e.key.charCodeAt(0) === 46
  ) {
    e.preventDefault();
    return false;
  }
}

submit.onclick = submitfn;
function submitfn() {
  start = 0;
  wpmsc.innerHTML = "";
  clearInterval(timeInterval);
  timer.innerHTML = "0s";
  time = 0;
  textdiv.scrollTop = 0;
  incr += 1;
  scoreval = 0;
  text = textArray[incr % 7];
  mainFn();
}

tarea.addEventListener("keydown", preventDefaultForScrollKeys, false);
// function getCurrentLine(text) {
//   var lineArray = [];
//   y = 0;
//   inc = 0;
//   t = 0;
//   words = text.split(" ");
//   while (inc < words.length) {
//     while (y <= 39 && inc < words.length) {
//       t = y + words[inc].length + 1;
//       if (t <= 39) {
//         y = t;
//         inc += 1;
//       } else {
//         break;
//       }
//     }
//     lineArray.push(y);
//     y = 0;
//   }
//   return lineArray.length;
// }
// function shuffleArray(array) {
//   for (var i = array.length - 1; i > 0; i--) {
//     var j = Math.floor(Math.random() * (i + 1));
//     var temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }
// }
