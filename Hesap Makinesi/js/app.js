const problem = document.querySelector(".problem"); /* Basılan tuşları yazacağımız eleman */
const result = document.querySelector(".result"); /* Sonucu yazacağımız eleman */
const calc = document.querySelector(".calc"); /* Eşittir tuşu */
const buttons = document.querySelectorAll(".buttons span"); /* Tüm tuşlar */

buttons.forEach((element) => {
  /* buttons dizisindeki tüm elemanlar için tek tek kod yazıyoruz. */
  element.addEventListener("click", () => {
    /* elemanımıza click fonksiyonu için EventListener ekliyoruz */
    problem.innerHTML == "0" ? problem.innerHTML = " " : ""; /* Ekranda "0" yazılı ise ekranı sıfırla */
    switch (element.innerHTML) {
        /* basılan tuşun içeriğini alıyoruz */
      case "+":
        /* Eğer tuş "+" ise */
        if (problem.dataset.check == "true") {
          /* Son karakter bir matematiksel ifade ise */
          problem.innerHTML += " " + element.innerHTML + " "; /* problem ekranına ifadeyi yaz */
          problem.dataset.check = false; /* Sıradaki tuş matematiksel ifade olamaz */
        }

        break;
      case "-":
        if (problem.dataset.check == "true") {

          problem.innerHTML += " " + element.innerHTML + " ";
          problem.dataset.check = false;
        }
        break;
      case "/":
        if (problem.dataset.check == "true") {

          problem.innerHTML += " " + element.innerHTML + " ";
          problem.dataset.check = false;
        }
        break;
      case "x":
        if (problem.dataset.check == "true") {

          problem.innerHTML += " * ";
          problem.dataset.check = false;
        }
        break;
      case "%":
        if (problem.dataset.check == "true") {

          problem.innerHTML += " " + element.innerHTML + " ";
          problem.dataset.check = false;
        }
        break;
      case "DEL":
        if (problem.innerHTML.length > 2) {
          /* Silinecek karakter var mı? */
          problem.innerHTML =
              problem.innerHTML.slice(-1) == " " /* Son karakter boşluk mu? */ ?
                  problem.innerHTML.slice(0, -2) /* Boşluk ise 2 karakter sil */ :
                  problem.innerHTML.slice(0, -1); /* Değil ise 1 karakter sil */
        } else {
          problem.innerHTML = "0" /* Silinecek karakter kalmadıysa ekrana "0" yaz */
        }
        break;
      case "=":
        break;
      default:
        problem.innerHTML += element.innerHTML; /* Basılan tuşu ekrana yaz */
        problem.dataset.check = true; /* Matematiksel ifade yazılabilir */
        break;
    }

  });
});



calc.addEventListener("click", () => {
  /* "=" Tuşuna Basılması */
  result.innerHTML = problem.innerHTML; /* Problemi ekranın üst tarafına yaz */
  problem.innerHTML = eval(problem.innerHTML); /* Problemi hesapla ve ekrana yaz */
});
