$(document).ready(function () {
    const json = "../json/tsconfig.json";
    createhtml();
    // // ========== Login SC ==========
    $("#submit").click(function (e) {
        e.preventDefault();

        const meberdata = {
            email: $("#inputEmail").val(),
            password: $("#inputPassword").val(),
        };
        $.ajax({
            url: json,
            type: "POST",
            data: JSON.stringify(meberdata),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                console.log(response.username);
                var username = $("#inputEmail").val();
                var password = $("#inputPassword").val();

                if (username === username.response && password === password.response) {
                    window.location.href = "index.html";
                } else {
                    console.log("error");
                }
            },
            error: function (response, message) {
                alert("Có lỗi xảy ra. " + message);
            },
        });
        return meberdata;
    });

    // POST music

    sessionStorage.removeItem("listitem");
    // post blog
    $("#add-blog").on("submit", function (e) {
        let type;
        let url
        ;
        e.preventDefault();
        const title = $("#titleid").val();
        const conten = $("#contenr").val();
        const urlimages = $("#urlimage").val();
        const fullDate = $("#dash-daterange").val();

        // upfile img   mot mang , data/img

        var blog = {
            title: title,
            text: conten,
            urlimages: urlimages,
            date: fullDate,
        };

        if (sessionStorage.getItem("listitem") != null) {
            const id = sessionStorage.getItem("listitem");
            url = "https://api.mlab.com/api/1/databases/mylove/collections/listmusic/" +
            id +
            "?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X";
            type = "PUT";
        } else {
            url = "https://api.mlab.com/api/1/databases/mylove/collections/listmusic?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X";
            type = "POST";
        }
        $.ajax({
            url: url,
            type: type,
            data: JSON.stringify(blog),
            contentType: "application/json",
            success: function (data) {
                window.location.href = "index.html";
                $.toast({
                    text: "Đăng bài thành công",
                    position: "top-right",
                    icon: "success",
                    stack: false,
                });
            },
        });
    });
    //edit id table music
    $("body").on("click", "#eidtblog", function (e) {
        e.preventDefault();
        sessionStorage.setItem("listitem", $(this).data("id"));
        $("#titleid").val($(this).data("title"));
        $("#contenr").val($(this).data("text"));
        $("#urlimage").val($(this).data("urlimages"));
        $("#update-img").val($(this).data("images"));
    });
    //delete id table music
    $("body").on("click", "#deleteblog", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        var url =
            "https://api.mlab.com/api/1/databases/mylove/collections/listmusic/" +
            id +
            "?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X";

        $.ajax({
            url: url,
            type: "DELETE",
            async: true,
            timeout: 300000,
            success: function (data) {
                window.location.href = "index.html";
                $.toast({
                    text: "Đăng bài thành công",
                    position: "top-right",
                    icon: "success",
                    stack: false,
                });
            },
        });
    });
    // get list table music
    Getlistblog();
    let count = 0;

    function Getlistblog() {
        $.ajax({
            url:
                "https://api.mlab.com/api/1/databases/mylove/collections/listmusic?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X",
        }).done(function (data) {
            var list = "";
            $.each(data, function (key, data) {
                var stt = count;
                const id = data._id.$oid;
                list +=
                    "<tr>\n" +
                    " <td>" +
                    stt +
                    "</td>" +
                    '<td class="cut-text-hidden"/' +
                    data.title +
                    ">\n" +
                    '<td class="cut-text-hidden demission"/' +
                    data.text +
                    ">\n" +
                    '<td class="cut-text-hidden demission"/' +
                    data.urlimages +
                    ">\n" +
                    '<td class="table-action">\n' +
                    '<a href="" id="eidtblog" data-id="' +
                    id +
                    '" data-title=" ' +
                    data.title +
                    ' " data-text ="' +
                    data.text +
                    '" data-urlimages=" ' +
                    data.urlimages +
                    ' " data-img="' +
                    data.images +
                    ' " class="action-icon"> <i class="mdi mdi-pencil"/></a>\n' +
                    '<a href="" id="deleteblog" data-id="' +
                    id +
                    '" data-title=" ' +
                    data.title +
                    ' " data-text ="' +
                    data.text +
                    '" data-urlimages=" ' +
                    data.urlimages +
                    ' " class="action-icon"> <i class="mdi mdi-delete"/></a>\n' +
                    "</td>\n" +
                    "</tr>";
                count++;
            });

            $("#listblog").html(list);
        });
    }

    // Post Slider
    // view to list file > json array
    $("#update-img").on("change", function (e) {
        const imgs = "";
        const files = e.target.files;
        $.each(files, function (i, file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                localStorage.setItem("images", e.target.result);
            };
        });
    });
    $("#update-img-icon").on("change", function (e) {
        const icon = e.target.files;
        $.each(icon, function (i, icon) {
            var reader = new FileReader();
            reader.readAsDataURL(icon);
            reader.onload = function (e) {
                localStorage.setItem("images-icon", e.target.result);
            };
        });
    });
    $("#add-images").on("submit", function (e) {
        e.preventDefault();
        const img = localStorage.getItem("images");
        const icon = localStorage.getItem("images-icon");
        const i = 0;
        if ((i) => 3) {
            const slider = {
                h1: $("#carousel-caption-text-h").val(),
                p: $("#carousel-caption-text-p").val(),
                url: img,
                icon: icon,
            };
            var url =
                "https://api.mlab.com/api/1/databases/mylove/collections/slider?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X";
            var type = "POST";
            $.ajax({
                url: url,
                type: type,
                data: JSON.stringify(slider),
                contentType: "application/json",
                success: function (data) {
                    setTimeout(localStorage.removeItem("images"), 300000);
                    setTimeout(localStorage.removeItem("images-icon"), 300000);
                    window.location.href = "index.html";
                    $.toast({
                        text: "Đăng bài thành công",
                        position: "top-right",
                        icon: "success",
                        stack: false,
                    });
                },
            });
        } else {
            window.location.href = "index.html";
        }
    });

    Getslider();
    let cou = 0;

    function Getslider() {
        $.ajax({
            url:
                "https://api.mlab.com/api/1/databases/mylove/collections/slider?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X",
        }).done(function (dat) {
            let list = "";
            $.each(dat, function (key, data) {
                const stt = cou;
                const ids = data._id.$oid;
                list +=
                    "<tr>\n" +
                    " <td>" +
                    stt +
                    "</td>" +
                    '<td class="cut-text-hidden"/' +
                    data.h1 +
                    ">\n" +
                    '<td class="cut-text-hidden demission"/' +
                    data.p +
                    ">\n" +
                    '<td class="table-user">\n' +
                    '<img src=" ' +
                    data.url +
                    ' " class="mr-2 rounded-circle" alt="">\n' +
                    "</td>" +
                    '<td class="table-user">\n' +
                    '<img src=" ' +
                    data.icon +
                    ' " class="mr-2 rounded-circle" alt="">\n' +
                    "</td>" +
                    '<td class="table-action">\n' +
                    "<a onclick=\"edit('" +
                    ids +
                    '\')" class="btn action-icon"> <i class="mdi mdi-pencil"/></a>\n' +
                    "<a  onclick=\"deletes('" +
                    ids +
                    '\')"   class="btn action-icon"> <i class="mdi mdi-delete"/></a>\n' +
                    "</td>\n" +
                    "</tr>";
                cou++;
            });
            $("#images-list").html(list);
        });
    }

    // ================

    //        Create link html

    //==================

    function createhtml() {
        const fileNamess = [];
        $("#create-html").on("click", function (e) {
            e.preventDefault();

            var forder = $("#forderHtml").val();
            var file = $("#fileHtml").val();

            $.ajax({
                url: "/templeateroom",
                success: function (data) {
                    $(data).each(function () {
                        window.name();
                    });
                    console.log(fileNamess);
                },
            });
            var url = {
                url: forder + "/" + file + ".html",
            };
            window.URL = window.URL || window.webkitURL;

            const blob = new Blob([url], {type: "text/html"});

            const link = document.createElement("a");
            // link.rel = 'stylesheet';
            link.href = window.URL.createObjectURL(blob);
            console.log(link);
            console.log(blob);
            var da = "";
            $.each(link, function (data) {
                da += "<tr><td>" + data + "</td></tr>";
            });
            $("#show-create-html").html(link);
        });
        // get
        // var fileNames = new Array();
        // $.ajax({
        //     url: "/templeateroom",
        //     success: function(data){
        //
        //         $(data).find("td > a").each(function(){
        //             if(openFile($(this).attr("href"))){
        //                 fileNames.push($(this).attr("href"));
        //             }
        //         });
        //     }
        // });
        // console.log(fileNames);
        // function openFile(file) {
        //     var extension = file.substr( (file.lastIndexOf('.') +1) );
        //     switch(extension) {
        //         case 'jpg':
        //         case 'png':
        //         case 'gif':   // the alert ended with pdf instead of gif.
        //         case 'zip':
        //         case 'rar':
        //         case 'pdf':
        //         case 'php':
        //         case 'doc':
        //         case 'html':
        //             return true;
        //             break;
        //         default:
        //             return false;
        //     }
        // };
    }
});
function edit(id) {
    $("#postslider").click(function (e) {
        e.preventDefault();

        const img = localStorage.getItem("images");
        const icon = localStorage.getItem("images-icon");
        const slider = {
            h1: $("#carousel-caption-text-h").val(),
            p: $("#carousel-caption-text-p").val(),
            url: img,
            icon: icon,
        };

        $.ajax({
            url:
                "https://api.mlab.com/api/1/databases/mylove/collections/slider/" +
                id +
                "?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X",
            data: JSON.stringify(slider),
            type: "PUT",
            contentType: "application/json",
            success: function (data) {
                $("#carousel-caption-text-h").val();
                $("#carousel-caption-text-p").val();
                window.location.href = "index.html";
                setTimeout(localStorage.removeItem("images"), 300000);
                setTimeout(localStorage.removeItem("images-icon"), 300000);
            },
        });
    });
}
function deletes(id) {
    $.ajax({
        url:
            "https://api.mlab.com/api/1/databases/mylove/collections/slider/" +
            id +
            "?apiKey=x4nvCtXFOThb0Vpst5PCZ493fNCxnK2X",
        type: "DELETE",
        async: true,
        timeout: 300000,
        success: function (data) {
            window.location.href = "index.html";
        },
    });
}
