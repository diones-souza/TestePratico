package controllers;

import play.*;
import play.mvc.*;
import play.libs.WS;
import play.libs.WS.*;
import org.w3c.dom.Document;
import com.google.gson.JsonElement;
import java.util.*;

public class Vacation extends Controller {

    public void index(Long year, String uf, String city){
        JsonElement result = this.getVacations(year, uf, city);
        renderJSON(result);
    }

    public JsonElement getVacations(Long year, String uf, String city){
        //fazer consulta na API do IBGE
        HttpResponse response = WS
                .url("https://api.calendario.com.br/?ano="+year+"&estado="+uf+"&cidade="+city+"&token=YW5kcmVtbmFzY2ltZW50b0B1ZmdkLmVkdS5iciZoYXNoPTIyNTM3MTM0Mg&json=true")
                .get();
        JsonElement result = response.getJson();
        return result;
    }
}