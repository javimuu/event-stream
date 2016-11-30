"use strict";
var express = require("express");
var http = require("http");
var nunjucks = require("nunjucks");
var bodyParser = require("body-parser");
var path = require("path");
var Application = (function () {
    function Application() {
        this.app = express();
        this.config();
        this.publicResource();
    }
    Application.prototype.config = function () {
        this.app.set("view engine", "jinja2");
        this.app.set("views", path.join(__dirname, "views"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        var environment = nunjucks.configure("./views", {
            express: this.app,
            autoescape: true,
            watch: this.env === "development"
        });
    };
    Application.prototype.publicResource = function () {
        this.app.use(express.static(path.join(__dirname, 'statics')));
    };
    Application.prototype.run = function () {
        try {
            var port = parseInt(process.env.PORT || "3000", 10);
            this.app.set("port", port);
            this.app.set("env", this.env);
            this.server = http.createServer(this.app);
            this.server.listen(port, function () {
                console.log("Server runing ...");
            });
            this.server.on("error", this.onError);
        }
        catch (error) {
            console.error(error.stack);
        }
    };
    Application.prototype.onError = function (error) {
        console.error(error);
    };
    return Application;
}());
exports.Application = Application;
