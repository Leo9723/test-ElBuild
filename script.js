jQuery(document).ready(function($){

    function getCategories() {
        $.get("https://api.chucknorris.io/jokes/categories", function(data) {
            for (var i = 0; i < data.length; i++) {
                var category = $("<input type='radio' name='category'>");
                category.val(data[i]);
                var label = $("<label>").text(data[i]);
                var div = $("<div>").append(category, label);
                $("#category-list").append(div);
            }
            getJokes(data[0]);
        });
    }

    function getJokes(category) {
        if (!category) {
            return;
        }
        $("#jokes-container").empty();
        for (var i = 0; i < 4; i++) {
            $.get("https://api.chucknorris.io/jokes/random?category=" + category, function (data) {
                $("#jokes-container").append("<p>" + data.value + "</p>");
            });
        }
    }

    $("#joke-form").submit(function (e) {
        e.preventDefault();
        var selectedCategory = $("input[name='category']:checked").val();
        getJokes(selectedCategory);
    });

    function getRandomJoke() {
        $.get("https://api.chucknorris.io/jokes/random", function (data) {
            $("#random-joke-container").empty();
            $("#random-joke-container").append("<p>" + data.value + "</p>");
        });
    }



    getCategories();

    $("#random-joke-button").on("click", function () {
        getRandomJoke();
    });


});