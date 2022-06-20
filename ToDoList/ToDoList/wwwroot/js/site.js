var currentList = {};

function createList() {
    currentList.name = $("#todolistName").val();
    currentList.items = new Array();
    //Web Service Call

    showToDoList();
}

function showToDoList() {
    $("#todolistTitle").html(currentList.name);
    $("#TodolistItems").empty();

    $("#createListView").hide();
    $("#TodoListDiv").show();
    $("#newItemName").focus();
    $("#newItemName").keyup(function (event) {
        if (event.keyCode == 13) {
            addItem();
        }
    });
}

function addItem() {
    var newItem = {};
    newItem.name = $("#newItemName").val();
    currentList.items.push(newItem);
    console.info(currentList);

    drawItems();
    $("#newItemName").val("");
}

function drawItems() {
    var $list = $("#TodolistItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name)
            .attr("id", "item_" + i);
        var $deleteBtn =
            $("<button onclick='deleteItem(" + i + ")'>D</button>").appendTo($li);
        var $checkBtn =
            $("<button onclick='checkItem(" + i + ")'>C</button>").appendTo($li);

        $li.appendTo($list);
    }
}

function deleteItem(index) {
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(index) {
    if ($("#item_" + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked");
    }
    else {
        $("#item_" + index).addClass("checked");
    }
}

function getToDoListById(id) {
    console.info(id);

    showToDoList();
    drawItems();
}

$(document).ready(function () {
    console.info("ready");
    $("#todolistName").focus();
    $("#todolistName").keyup(function (event) {
        if (event.keyCode == 13) {
            createList();
        }
    });
    
    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");
    if (idIndex != -1) {
        getToDoListById(pageUrl.substring(idIndex + 4));
    }
});