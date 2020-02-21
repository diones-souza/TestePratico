package controllers;

import play.*;
import play.mvc.*;
import play.data.validation.*;
import java.util.*;
import models.People;

public class Person extends Controller {

    public static void index() {
        render();
    }

    public static void list() {
        //buscar registros
        List<People> people = People.findAll();
        render(people);
    }

    public static void save(@Valid People person) {
        //verificar se há erros
        if(validation.hasErrors()){
            //guardar mensagens de erros
            params.flash();
            validation.keep();
            index();
        }
        person.save();
        flash.success("Registro Salvo");
        index();
    }

    public static void edit(Long id) {
        //buscar registro
        People person = People.findById(id);
        renderTemplate("Person/index.html",person);
    }

    public static void destroy(Long id) {
        //buscar registro
        People person = People.findById(id);
        person.delete();
        flash.success("Registro excluido");
        list();
    }
}