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
    @MinSize(value=3, message="O tamanho mínimo é 3")
    //campo obrigatório, no mínimo 3 caracteres
    public String name;

    @Required
    @Min(value=16, message="Não pode ser inferior a 16")
    @Max(value=64, message="Não pode ser superior a 64")
    //campo obrigatório, no mínimo 16 no máximo 64
    public Integer age;

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
}
