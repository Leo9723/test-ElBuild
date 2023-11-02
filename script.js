jQuery(document).ready(function($){

    function getCategories() {
        $.get("https://api.chucknorris.io/jokes/categories", function(data) {
            for (var i = 0; i < data.length; i++) {
                var category = $("<input type='radio' name='category' class='radio'>");
                category.val(data[i]);
                var label = $("<label>").text(data[i]);
                var div = $("<div class='category'>").append(category, label);
                var divContainer = $("<div class='category-container'>").append(div);
                $("#category-list").append(divContainer);
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
                $("#jokes-container").append("<p> <i class='fa-solid fa-arrow-right'></i> " + data.value + "</p>");
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
            $("#random-joke-label").empty();
            $("#random-joke-label").append("<p>" + data.value + "</p>");
        });
    }



    getCategories();

    $("#random-joke-button").on("click", function () {
        getRandomJoke();
    });


    // inizio stile

    $("#random-joke-button").click(function(){
        console.log("we")
        $("#random-joke-container").addClass("active");
        $(".effect-bkg").addClass("active");
    })

    $(".close").click(function(){
        $("#random-joke-container").removeClass("active");
        $(".effect-bkg").removeClass("active");
    })

    $(".effect-bkg").click(function(){
        $("#random-joke-container").removeClass("active");
        $(".effect-bkg").removeClass("active");
    })



    $("#category-list").on("change", "input[type='radio']", function () {
        $(".category").removeClass("checked");
        if ($(this).is(":checked")) {
            $(this).closest(".category").addClass("checked");
        }
    });


});