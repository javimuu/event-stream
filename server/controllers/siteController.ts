import * as express from "express";

export module Route {
  export class SiteController {
    /*
     * Load home page
     */
    public index(req: express.Request, res: express.Response, next: express.NextFunction) {
      res.render("index");
    }

    /*
     * Create a new event
     */
     public create(req: express.Request, res: express.Response, next: express.NextFunction) {
      res.render("create");
    }

    /*
     * Update an event
     */

    public update(req: express.Request, res: express.Response, next: express.NextFunction) {
       res.render("update");
     }

     /*
      * Delete an event
      */

    public delete(req: express.Request, res: express.Response, next: express.NextFunction) {
      
    }

  }
}
