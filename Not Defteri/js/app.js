const addbtn = document.querySelector(".btn-add") /* Not ekleme butonu */
const input = document.querySelector(".to-do") /* Not girilen input */
const list = document.querySelector(".list ul") /* Notların bulunduğu liste */
var ToDoList = new Array(); /* Notları tutacağımız dizi */
var counter = 0; /* Not sayısı */
// ADD ITEM
addbtn.addEventListener("click", () => {
    /* Not Ekleme Tuşuna Basılması */
    counter++; /* Not sayısını 1 arttırıyoruz */
    var item = {
        /* Notu tutmak için bir object tanımlıyoruz */
        id: counter,
        /* Not için eşsiz bir id belirliyoruz */
        todo: input.value /* Girilen not değerini tutuyoruz */
    };
    ToDoList.push(item); /* Oluşturduğumuz objecti dizimize ekliyoruz */
    input.value = ""; /* Not inputumuzu sıfırlıyoruz */
    /* Notu listenin en başına ekliyoruz */
    list.insertAdjacentHTML('afterbegin', '<li data-item="' + item.id + '"><p>' + item.todo + '</p><button class="btn btn-remove" type="button">&#8722;</button> </li>');
    /* Notları tarayıcının hafızasında tutuyoruz */
    localStorage.setItem("list", JSON.stringify(ToDoList));
    /* Notları Silmek İçin */
    document.querySelectorAll(".btn-remove").forEach(element => {
        element.addEventListener("click", () => {
            removeItem(element)
        });
    });
});

// REMOVE ITEM
function removeItem(element) {
    element.parentNode.remove(); /* Tıklanan butonun kapsayıcı etiketini siliyoruz. Böylece ilk olarak ekrandan siliyoruz */
    /* Silinen notun id'sine göre notlarımızı tuttuğumuz listeden siliyoruz */
    const index = ToDoList.map(e => e.id).indexOf(Number(element.parentNode.dataset.item));
    if (index > -1) {
        ToDoList.splice(index, 1);
    }
    /* Tarayıcının hafızasını güncelliyoruz */
    localStorage.setItem("list", JSON.stringify(ToDoList));
}

// FILL LIST
document.addEventListener('DOMContentLoaded', function() {
    /* Hafızadaki notları çekiyoruz */
    var listitems = localStorage.getItem("list");
    /* Her bir not için işlem yapıyoruz */
    JSON.parse(listitems).forEach(element => {
        /* Notu ekrana ekliyoruz */
        list.insertAdjacentHTML('afterbegin', '<li data-item="' + element.id + '"><p>' + element.todo + '</p><button class="btn btn-remove" type="button">&#8722;</button> </li>');
        /* Notu bir object içerisine atıyoruz */
        var item = {
            id: element.id,
            todo: element.todo
        };

        /* object içerisindeki verileri notlarımızı tuttuğumuz listeye atıyoruz */
        ToDoList.push(item);
        /* Not sayısını güncelliyoruz */
        counter = ToDoList.length;
    });

    /* Silme işlemi için */
    document.querySelectorAll(".btn-remove").forEach(element => {
        element.addEventListener("click", () => {
            removeItem(element)
        });
    });
}, false);
