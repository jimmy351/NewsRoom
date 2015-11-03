# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table article (
  id                        bigint auto_increment not null,
  title                     varchar(255),
  author_id                 bigint,
  description               varchar(255),
  text                      varchar(255),
  enabled                   tinyint(1) default 0,
  date_created              datetime not null,
  date_modified             datetime not null,
  constraint pk_article primary key (id))
;

create table user (
  id                        bigint auto_increment not null,
  password                  varchar(255),
  name                      varchar(255),
  email                     varchar(255),
  access_level              integer,
  enabled                   tinyint(1) default 0,
  date_added                datetime not null,
  constraint uq_user_password unique (password),
  constraint pk_user primary key (id))
;

alter table article add constraint fk_article_author_1 foreign key (author_id) references user (id) on delete restrict on update restrict;
create index ix_article_author_1 on article (author_id);



# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table article;

drop table user;

SET FOREIGN_KEY_CHECKS=1;

