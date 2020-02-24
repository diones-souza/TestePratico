package models;

import javax.persistence.*;
import play.db.jpa.Model;
import play.data.validation.*;

@Entity
public class People extends Model{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Required
    @MinSize(value=3, message="O campo tem que ter mínimo 3 caracteres")
    @MaxSize(value=40, message="O campo pode ter no máximo 40 caracteres")
    //campo obrigatório, no mínimo 3 caracteres
    public String name;

    @Required
    @Min(value=14, message="O campo não pode ser inferior a 16")
    @Max(value=80, message="O campo não pode ser superior a 80")
    //campo obrigatório, no mínimo 16 no máximo 64
    public Integer age;

    @Required
    public String uf;

    @Required
    public String city;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
