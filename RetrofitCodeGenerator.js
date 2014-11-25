// import the mustache.js script
require("mustache.js");
require("URI.js");

var RetrofitCodeGenerator = function() {

    this.headers = function(request) {

        var headers = request.headers;
        var result = {};
        result.hasHeaders = Object.keys(headers).length > 0;
        result.list = [];

        for (headerName in headers) {
            var headerValue = headers[headerName];
            result.list.push({
                "name" : headerName,
                "value" : headerValue
            });
        }
        return result;
    }

    this.renderHeader = function (headers) {
        var headerView = {
            "combine" : headers.list.length > 1,
            "headers" : headers
        }
        return Mustache.render(readFile("headers.mustache"), headerView);
    }

    this.params = function(request) {

        var result = [];
        var queryParams = URI(request.url).search(true);
        for (name in queryParams) {
            var value = queryParams[name];
            result.list.push({
                "name": name,
                "value": value
            });
        }
    }

    this.generate = function(context) {

        var request = context.getCurrentRequest();
        var path = URI(request.url).path();
        var headers = this.headers(request);

        // define your view
        var view = {
            "request":request,
            "path":path,
            "headers":this.renderHeader(headers),
            "method":request.method
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