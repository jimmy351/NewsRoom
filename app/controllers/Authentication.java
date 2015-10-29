package controllers;

import models.User;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;
import util.Database;

/**
 * Created by owner on 29/10/15.
 */

public class Authentication extends Security.Authenticator {
    Database d = Database.getInstance();

    @Override
    public String getUsername(Http.Context ctx) {
        return ctx.session().get("username");
    }

    @Override
    public Result onUnauthorized(Http.Context ctx) {
        return redirect("/login");
    }

    public static String getUser(Http.Context ctx) {
        if (ctx.session().get("username") != null)
            return ctx.session().get("username");
        return null;
    }

    public static boolean isLoggedIn(Http.Context ctx) {
        return (getUser(ctx) != null);
    }

    public static User getCurrentUser(Http.Context ctx) {
        return (isLoggedIn(ctx) ? Database.getInstance().getUser(getUser(ctx)) : null);
    }

}

