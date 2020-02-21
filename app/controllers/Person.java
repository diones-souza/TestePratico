package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.People;

public class Person extends Controller {

    public static void index() {
        render();
    }

    public static void list() {
        List<People> people = People.findAll();
        render(people);
    }

    public static void save(People person) {
        person.save();
        flash.success("Registro Salvo");
        index();
    }

    public static void edit(Long id) {
        People person = People.findById(id);
        renderTemplate("Person/index.html",person);
    }

    public static void destroy(Long id) {
        People person = People.findById(id);
        person.delete();
        flash.success("Registro excluido");
        list();
    }
}