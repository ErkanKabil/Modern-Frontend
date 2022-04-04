const wheatherTypes = {
  COLD: {
    backgroundImage: "assets/snow.jpg",
    icon: "fas fa-snowflake"
  },
  NORMAL: {
    backgroundImage: "assets/normal.jpg",
    icon: "fas fa-cloud"
  },
  HOT: {
    backgroundImage: "assets/hot.jpg",
    icon: "fas fa-sun"
  }
}


window.addEventListener("load", () => { // Sayfa yüklendikten sonra çalıştırıyoruz
  if (navigator.geolocation) { // Kullanıcının konumunu almak için navigator.geolocation ihtiyacımız var. O yüzden ilk olarak bunu kontrol ediyoruz
    navigator.geolocation.getCurrentPosition(position => { // navigator.geolocation ile mevcut konumu almak için getCurrentPosition fonksiyonunu kullanıyoruz. Bu fonksiyon bize konumu position içerisinde dönüyor.
      const API_KEY = "64d581d82ac28a1f89e03848f22acfe1"; // Kullanacağımız servis için gereken API Key bilgisini tutuyoruz. Sizin de kendinize ait bir key kodunuz oalcak
      const long = position.coords.longitude; // Kullanıcının konum bilgisi için longitude değerini alıyoruz
      const lat = position.coords.latitude; // Kullanıcının konum bilgisi için latitude değerini alıyoruz
      const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat},${long}`; /* Kullanacağımız adres bu şekilde. API Key ve kullanıcının konum bilgilerini dinamik olarak belirtiyoruz */

      fetch(URL) // fetch kullanarak yukarıda oluşturduğumuz adrese istek atıyoruz
          .then(response => response.json()) // dönen response değerini json'a çeviriyoruz
          .then(data => {
            setData(data) // verilimizi ekrana basmak için setData fonksiyonunu çağırıyoruz.
          })
    })
  }
})

const setData = (data) => {
  const weatherAppWrapperEl = document.querySelector(".weatherAppWrapper"); // Arka planı değiştireceğimiz için kapsayıcı etiketi alıyoruz
  const degreeEl = document.querySelector(".temparatureWrapper .degree .value"); // Sıcaklık değerini basacağımız etiketi alıyoruz
  const locationEl = document.querySelector(".temparatureWrapper .location"); // Şehir bilgisini basacağımız etiketi alıyoruz
  const weatherIconEl = document.querySelector(".temparatureWrapper .icon"); // Hava sıcaklığına göre ikonumuzu düzenleyeceğimiz için, ilgili etiketi alıyoruz

  const temperature = data?.current?.temperature // gelen data içerisinden sıcaklık bilgisini alıyoruz. ? koymamızın sebebi de null kontrolü yapmak
  const location = data?.location?.region //  gelen data içerisinden şehir bilgisini alıyoruz

  degreeEl.innerText = temperature // sıcaklık değerimizi ekrana basıyoruz
  locationEl.innerText = location // şehir bilgisini ekrana basıyoruz

  let weatherType; // Yukarıda belirlediğimiz object içerisinde eşleşecek değer
  if (temperature <= 8) { // Eğer sıcaklık 8'den küçükse:
    weatherType = "COLD" // Hava durumu tipini COLD yapıyoruz
  } else if (temperature > 8 && temperature <= 22) { // Eğer sıcaklık 8-12 arasındaysa:
    weatherType = "NORMAL" // Hava durumu tipini NORMAL yapıyoruz
  } else if (temperature > 22) { // Eğer sıcaklık 22'den büyükse:
    weatherType = "HOT" // Hava durumu tipini HOT yapıyoruz
  }

  weatherAppWrapperEl.style.backgroundImage = `url('${wheatherTypes[weatherType]?.backgroundImage}')`; // Kapsayıcı etiketin arka plan görselini değiştiriyoruz. Bu veriyi yukarıda oluşturduğumuz object içerisinden çekiyoruz
  document.body.style.backgroundImage = `url('${wheatherTypes[weatherType]?.backgroundImage}')`; // body etiketinin arka plan görselini değiştiriyoruz
  weatherIconEl.innerHTML = `<i class='${wheatherTypes[weatherType]?.icon}'></i>` // ikonu değiştiriyoruz
}
