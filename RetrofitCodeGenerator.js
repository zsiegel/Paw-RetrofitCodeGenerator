// import the mustache.js script
require("mustache.js");
require("URI.js");

var RetrofitCodeGenerator = function() {

    this.generate = function(context) {

        var request = context.getCurrentRequest();

        var path = URI(request.url).path();

        // define your view
        var view = {
            "request":request,
            "path":path,
            "content_type":context.getCurrentRequest().getHeaderByName('Content-Type'),
            "method":context.getCurrentRequest().method
        };

        // import the mustache template
        var template = readFile("retrofit-template.mustache");

        // render the template
        return Mustache.render(template, view);
    }
}

RetrofitCodeGenerator.identifier = "com.zsiegel.PawExtensions.RetrofitCodeGenerator";
RetrofitCodeGenerator.title = "Retrofit Generator";

registerCodeGenerator(RetrofitCodeGenerator);