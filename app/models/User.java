package models;

import com.avaje.ebean.annotation.CreatedTimestamp;
import com.fasterxml.jackson.annotation.JsonBackReference;
import play.data.validation.Constraints;
import play.db.ebean.Model;
import javax.persistence.*;
import java.util.*;

/**
 * Created by owner on 28/10/15.
 */
@Entity
public class User extends Model{

    @Id
    @GeneratedValue
    @Constraints.Required
    @Column(unique=true)
    private Long id;

    @Constraints.Required
    @Column(unique=true)
    private String password;

    @Constraints.Required
    private String name;

    @Constraints.Required
    private String email;

    @CreatedTimestamp
    private Date date_added;

    @OneToMany(fetch = FetchType.LAZY)
    @JsonBackReference
    private ArrayList<Article> articles;

    @Constraints.Required
    private int access_level;

    @Constraints.Required
    private boolean enabled;

    public User(Long id, String password, String name, String email, int access_level, boolean enabled) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.email = email;
        this.access_level = access_level;
        this.enabled = enabled;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDate_added() {
        return date_added;
    }

    public void setDate_added(Date date_added) {
        this.date_added = date_added;
    }

    public ArrayList<Article> getArticles() {
        return articles;
    }

    public void setArticles(ArrayList<Article> articles) {
        this.articles = articles;
    }

    public int getAccess_level() {
        return access_level;
    }

    public void setAccess_level(int access_level) {
        this.access_level = access_level;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", articles=" + articles +
                ", access_level=" + access_level +
                ", enabled=" + enabled +
                '}';
    }
}
