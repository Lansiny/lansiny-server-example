create table if not exists `admin_log` (
  -- index
  `id` int(8) unsigned zerofill not null auto_increment comment '本条记录的id',
  -- body
  `user_id` int(8) unsigned zerofill not null default 0 comment '操作者id',
  `url` varchar(64)  not null default '' comment '请求的url',
  `params` json not null comment '提交的参数',
  -- required
  `is_valid` tinyint(1) unsigned not null default 1 comment '是否有效, 有效为 1, 无效为 0',
  `create_at` datetime not null default current_timestamp comment '创建时间',
  `update_at` datetime not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key (`id`)
) engine = InnoDB auto_increment = 0 default charset = utf8 comment '管理记录';
