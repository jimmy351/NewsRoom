package controllers;

import play.*;
import play.mvc.*;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.*;
import org.apache.commons.lang3.math.NumberUtils;
import org.joda.time.DateTime;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import util.Database;
import views.html.*;
import java.util.*;
import views.html.*;

public class Application extends Controller {

    public static User getUserOrRedirect() {
        User u = Authentication.getCurrentUser(ctx());
        if (session().isEmpty() || u == null) {
            return null;
        }
        return u;
    }

    public static Result invalidUser() {
        session().clear();
        return redirect("/login");
    }

    public static Result login() {
        return ok(login.render("Your new application is ready."));
    }

    public static Result article(Long id){
        User currentUser = getUserOrRedirect();
        if (currentUser == null) {
            return invalidUser();
        }
        return Results.TODO;
    }

}
