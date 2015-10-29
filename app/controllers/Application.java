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

    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public static Result article(Long id){
        return Results.TODO;
    }

}
