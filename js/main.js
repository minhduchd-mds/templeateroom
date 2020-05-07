$(document).ready(function () {
    var s_w2 =
        "https://api.mlab.com/api/1/databases/mylove/collections/listmusic?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X";
    listmusic();

    photolove();
    // Show nav
    $("header#menu").hide();
    $("span#menus").on("click", function (e) {
        e.preventDefault();
        $("header#menu").toggle();
    });
    slider();
    function slider() {
        $.ajax({
            url:
                "https://api.mlab.com/api/1/databases/mylove/collections/slider/?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X",
        }).done(function (items) {
            var item = "";
            var item1 = "";
            var item2 = "";
            item +=
                '                    <img class="d-block w-100" src=" ' +
                items[0].url +
                ' " alt="a">\n' +
                '                    <div class="carousel-caption-text">\n' +
                '                        <h1 class="title divider animated bounceInLeft text-warning"> ' +
                items[0].h1 +
                "</h1>\n" +
                '                        <p class="lead animated bounceInRight text-white">' +
                items[0].p +
                "                        </p>\n" +
                '                        <img class="animated bounceInDown" src= " ' +
                items[0].icon +
                ' " height="128" width="128" alt="a"/>\n' +
                "                    </div>\n";
            item1 +=
                '                    <img class="d-block w-100" src=" ' +
                items[1].url +
                ' " alt="s">\n' +
                '                    <div class="carousel-caption-text">\n' +
                '                        <h1 class="title divider animated bounceInDown text-warning"> ' +
                items[1].h1 +
                "</h1>\n" +
                '                        <p class="lead animated bounceInRight text-white">' +
                items[1].p +
                "                        </p>\n" +
                '                        <img class="animated bounceInDown" src= " ' +
                items[1].icon +
                ' " height="128" width="128" alt=""/>\n' +
                "                </div>";
            item2 +=
                '                    <img class="d-block w-100" src=" ' +
                items[2].url +
                ' " alt="a">\n' +
                '                    <div class="carousel-caption-text">\n' +
                '                        <h1 class="title divider animated bounceInRight text-warning"> ' +
                items[2].h1 +
                "</h1>\n" +
                '                        <p class="animated bounceInRight text-white">' +
                items[2].p +
                "                        </p>\n" +
                '                        <img class="animated bounceInDown" src= " ' +
                items[2].icon +
                ' " height="128" width="128" alt=""/>\n' +
                "                </div>";
            $("#view-item-1").html(item);
            $("#view-item-2").html(item1);
            $("#view-item-3").html(item2);
        });
    }
    // page music time 1500
    $("#music-list").hide();
    $("#music").on("click", function (e) {
        e.preventDefault();
        music();
    });
    function music() {
        $("#music-list").toggle();
    }
    function listmusic() {
        $.ajax({
            url: s_w2,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                var list = "";
                $.each(response, function (key, data) {
                    var id = data._id.$oid;

                    list +=
                        '<li><a class="btn" onclick="play(\'' +
                        id +
                        "')\"/" +
                        data.title +
                        "></li>";
                });
                $("ul.music-list-conten").html(list);
            },
            error: function (response, message) {
                alert("Có lỗi xảy ra. " + message);
            },
        });
    }
    // photo
    function photolove() {}
    // chat message
    var myDataRef = new Firebase("https://matrimony-chat.firebaseio.com/");
    var count = 0;
    var sent_message_image = [];
    $("#sent-message").on("change", function (e) {
        var files = e.target.files;
        $.each(files, function (i, file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            // name.push(file.name);
            reader.onload = function (e) {
                sent_message_image.push(e.target.result);
                var template =
                    '<img class="form-control rounded bg-light" src=" ' +
                    e.target.result +
                    ' " >';
            };
        });
    });
    $("#messageInput").keypress(function (e) {
        if (e.keyCode === 13) {
            //Enter
            var d = new Date();
            var text = $("#messageInput").val();
            var minutes = d.getMinutes();

            var userm = {
                id: 1,
                count: count,
                name: "admin",
                image: sent_message_image,
                time: minutes,
                text: text,
                status: "1",
            };
            myDataRef.push(userm); //cho phép thêm nhiều bản ghi
            // var myObj = JSON.parse(myJSON);
            $("#messageInput").val("");
        }
        count++;
    });
    myDataRef.on("child_added", function (snapshot) {
        var message = snapshot.val();
        snapshot.forEach(function (childSnapshot) {});
        viewchat(
            message.name,
            message.text,
            message.image,
            message.time,
            message.id
        );
    });

    function viewchat(name, text, image, time, id) {
        var items = "";
        items +=
            '<div class="bubble chat-left">\n' +
            ' <div class="titles">' +
            name +
            "</div>" +
            ' <div class="message">' +
            text +
            "</div>" +
            ' <div class="time">' +
            time +
            " phút</div>\n" +
            "</div>";
        $("<div/>").prepend(items).appendTo($("#mes"));
    }

    // Slider
});

function play(id) {
    $.ajax({
        url:
            "https://api.mlab.com/api/1/databases/mylove/collections/listmusic/" +
            id +
            "?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X",
    }).done(function (data) {
        var view_music = "";

        view_music += '<source src="' + data.urlimages + '">';
        $("#audio").html(view_music);
    });
}
