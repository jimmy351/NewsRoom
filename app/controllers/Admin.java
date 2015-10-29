package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.*;
import play.Play;
import play.data.DynamicForm;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Results;
import util.Database;
import views.html.*;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
/**
 * Created by owner on 29/10/15.
 */
public class Admin {

    public static Result articles(){
        return Results.TODO;
    }

    public static Result article(Long id){
        return Results.TODO;
    }
}
