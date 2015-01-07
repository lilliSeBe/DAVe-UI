# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table margin_component (
  id                        bigint not null,
  clearer                   varchar(255),
  member                    varchar(255),
  account                   varchar(255),
  clss                      varchar(255),
  ccy                       varchar(255),
  txn_tm                    timestamp,
  biz_dt                    timestamp,
  req_id                    varchar(255),
  rpt_id                    varchar(255),
  ses_id                    varchar(255),
  variation_margin          decimal(38),
  premium_margin            decimal(38),
  liqui_margin              decimal(38),
  spread_margin             decimal(38),
  additional_margin         decimal(38),
  received                  timestamp,
  constraint pk_margin_component primary key (id))
;

create table trading_session_status (
  id                        bigint not null,
  req_id                    varchar(255),
  ses_id                    varchar(255),
  stat                      varchar(255),
  stat_rej_rsn              varchar(255),
  txt                       varchar(255),
  constraint pk_trading_session_status primary key (id))
;

create sequence margin_component_seq;

create sequence trading_session_status_seq;




# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists margin_component;

drop table if exists trading_session_status;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists margin_component_seq;

drop sequence if exists trading_session_status_seq;

