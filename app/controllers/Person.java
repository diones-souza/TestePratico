package controllers;

import play.*;
import play.mvc.*;
import play.data.validation.*;
import play.cache.*;
import play.libs.WS;
import play.libs.WS.*;
import org.w3c.dom.Document;
import com.google.gson.JsonElement;
import java.util.*;
import models.People;

public class Person extends Controller {

    public static void index() {
        //pegar model no cache
        People person = (People)Cache.get("person");
        //limpar o model do cache
        Cache.set("person", null);
        render(person);
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
            validation.keep();
            flash.error("Erro ao salvar registro");
            //guardar model no cache
            Cache.set("person",person);
            index();
        }
        person.save();
        flash.success("Registro Salvo");
        index();
    }

    public static void edit(Long id) {
        //buscar registro
        People person = People.findById(id);
        renderTemplate("person/index.html",person);
    }

    public static void destroy(Long id) {
        //buscar registro
        People person = People.findById(id);
        person.delete();
        flash.success("Registro excluido");
        list();
    }

    public void states(){
        JsonElement result = this.getStates();
        renderJSON(result);
    }

    public void cities(Long uf){
        //fazer consulta na API do IBGE
        JsonElement result = this.getCities(uf);
        renderJSON(result);
    }

    protected JsonElement getStates(){
        //fazer consulta na API do IBGE
        HttpResponse response = WS
                .url("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
                .get();
        JsonElement result = response.getJson();
        return result;
    }

    protected JsonElement getCities(Long uf){
        HttpResponse response = WS
                .url("https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+uf+"/municipios")
                .get();
        return response.getJson();
    }
}