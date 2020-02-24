package controllers;

import play.*;
import play.mvc.*;
import play.libs.WS;
import play.libs.WS.*;
import org.w3c.dom.Document;
import com.google.gson.JsonElement;
import java.util.*;
import models.People;
import models.Vacations;

public class Vacation extends Controller {

    public void index(Long year, String uf, String city){
        JsonElement result = this.getHolidays(year, uf, city);
        renderJSON(result);
    }

    public void save(Long personId, String start, String end){
        People person = People.findById(personId);
        Vacations vacation = new Vacations();
        vacation.setPerson(person);
        vacation.setStart(start);
        vacation.setEnd(end);
        vacation.save();
    }

    public static void list(){
        //buscar registros
        List<Vacations> vacations = Vacations.findAll();
        render(vacations);
    }

    public JsonElement getHolidays(Long year, String uf, String city){
        //fazer consulta na API do IBGE
        HttpResponse response = WS
                .url("https://api.calendario.com.br/?ano="+year+"&estado="+uf+"&cidade="+city+"&token=YW5kcmVtbmFzY2ltZW50b0B1ZmdkLmVkdS5iciZoYXNoPTIyNTM3MTM0Mg&json=true")
                .get();
        JsonElement result = response.getJson();
        return result;
    }

    public static void destroy(Long id){
        //buscar registro
        Vacations vacation = Vacations.findById(id);
        vacation.delete();
        flash.success("Registro excluido");
        list();
    }
}