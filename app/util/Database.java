package util;

import com.avaje.ebean.Expr;
import com.avaje.ebean.Ebean;
import com.avaje.ebean.EbeanServer;
import com.avaje.ebean.annotation.Transactional;
import models.*;

import java.util.ArrayList;

/**
 * Created by owner on 29/10/15.
 */
public class Database {

    private final EbeanServer server = Ebean.getServer("default");
    private static Database instance;

    public static Database getInstance() {
        if (instance == null)
            instance = new Database();
        return instance;
    }

    public void saveData(Object input, Class whichClass) {
        server.beginTransaction();
        server.save(whichClass.cast(input));
        server.commitTransaction();
    }

    public void updateData(Object input, Class whichClass) {
        server.beginTransaction();
        server.update(whichClass.cast(input));
        server.commitTransaction();
    }

    @Transactional
    public void saveUser(User user){
        saveData(user, User.class);
    }

    @Transactional
    public void saveArticle(Article article){
        saveData(article, Article.class);
    }

    @Transactional
    public void updateUser(User user){
        updateData(user, User.class);
    }

    @Transactional
    public void updateArticle(Article article){
        updateData(article, Article.class);
    }

    @Transactional
    public ArrayList<Article> getArticles(){
        return new ArrayList<Article>(server.find(Article.class)
                .findList());
    }

    @Transactional
    public ArrayList<User> getUsers(){
        return new ArrayList<User>(server.find(User.class)
                .findList());
    }

    @Transactional
    public Article findArticleById(Long id){
        return server.find(Article.class)
                .where()
                .eq("id", id)
                .findUnique();
    }

    @Transactional
    public Article findArticleByTitle(String title){
        return server.find(Article.class)
                .where()
                .eq("title", title)
                .findUnique();
    }

    @Transactional
    public User findUserById(Long id){
        return server.find(User.class)
                .where()
                .eq("id", id)
                .findUnique();
    }

}
