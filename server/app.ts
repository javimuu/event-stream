import * as express from "express";
import * as http from "http";
import * as nunjucks from "nunjucks";
import * as bodyParser from "body-parser";
import * as path from "path";

export class Application {
    public app: express.Application;
    public server: http.Server;
    public env: string;

    constructor() {
        this.app = express();
        this.config();
        this.publicResource();
    }

    config(): void {
        this.app.set("view engine", "jinja2");
        this.app.set("views", path.join(__dirname, "views"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        const environment = nunjucks.configure("./views", {
                express: this.app,
                autoescape: true,
                watch: this.env === "development"
        });
    }

    publicResource(): void {
        this.app.use(express.static(path.join(__dirname, 'statics')));
    }

    run(): void {
        try {
            const port = parseInt(process.env.PORT || "3000", 10);
            this.app.set("port", port);
            this.app.set("env", this.env);

            this.server = http.createServer(this.app);
            this.server.listen(port, ()=>{
                console.log("Server runing ...");
            });
            this.server.on("error", this.onError);
        } catch (error) {
            console.error(error.stack);
        }
    }

    private onError(error: Error): void {
        console.error(error);
    }
}
