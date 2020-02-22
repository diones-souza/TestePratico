package controllers;

import play.*;
import play.mvc.*;
import play.data.validation.*;
import play.cache.*;
import java.util.*;
import models.People;

public class Vacation extends Controller {

    public static void create(Long id) {
        //buscar registro
        People person = People.findById(id);
        renderTemplate("vacation/index.html", person);
    }

}
