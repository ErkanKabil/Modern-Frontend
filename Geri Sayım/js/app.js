setInterval(() => {
    /* 1 saniyede 1 kez çalışacak fonksiyon */
    const newYear = new Date("Jan 1,2021,00:00:00").getTime(); /* Yılbaşını belirliyoruz  */
    const now = new Date().getTime(); /* Şu anki tarihi alıyoruz */
    var calc = newYear - now; /* Yılbaşı ile şu anki tarih arasındaki farkı hesaplıyoruz */
    var s = 1000; /* Saniye */
    var m = s * 60; /* Dakika */
    var h = m * 60; /* Saat */
    var d = h * 24; /* Dakika */

    var day = Math.floor(calc / d); /* Farkı gün cinsinden hesaplıyoruz */
    var hour = Math.floor((calc % d) / h); /* Farkı saat cinsinden hesaplıyoruz */
    var minute = Math.floor((calc % h) / m); /* Farkı dakika cinsinden hesaplıyoruz */
    var second = Math.floor((calc % m) / s); /* Farkı saniye cinsinden hesaplıyoruz */

    document.querySelector(".day .value").innerHTML = day; /* Gün değerini ekrana yaz */
    document.querySelector(".hour .value").innerHTML = hour; /* Saat değerini ekrana yazdırıyoruz */
    document.querySelector(".minute .value").innerHTML = minute; /* Dakika değerini ekrana yazdırıyoruz */
    document.querySelector(".second .value").innerHTML = second; /* Saniye değerini ekrana yazdırıyoruz */

}, 1000);
