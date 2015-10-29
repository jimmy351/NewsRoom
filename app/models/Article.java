package models;

import com.avaje.ebean.annotation.CreatedTimestamp;
import com.avaje.ebean.annotation.UpdatedTimestamp;
import com.fasterxml.jackson.annotation.JsonBackReference;
import play.data.validation.Constraints;
import play.db.ebean.Model;
import javax.persistence.*;
import java.util.Date;

/**
 * Created by owner on 28/10/15.
 */
@Entity
public class Article extends Model{

    @Id
    @GeneratedValue
    @Constraints.Required
    @Column(unique=true)
    private Long id;

    @Constraints.Required
    private String title;

    @Constraints.Required
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private User author;

    @Constraints.Required
    private String description;

    @Constraints.Required
    private String text;

    @CreatedTimestamp
    private Date date_created;

    @UpdatedTimestamp
    private Date date_modified;

    @Constraints.Required
    private boolean enabled;

    public Article(Long id, String title, User author, String description, String text, boolean enabled) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.text = text;
        this.enabled = enabled;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDate_created() {
        return date_created;
    }

    public void setDate_created(Date date_created) {
        this.date_created = date_created;
    }

    public Date getDate_modified() {
        return date_modified;
    }

    public void setDate_modified(Date date_modified) {
        this.date_modified = date_modified;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author=" + author +
                ", description='" + description + '\'' +
                ", text='" + text + '\'' +
                ", enabled=" + enabled +
                '}';
    }
}
