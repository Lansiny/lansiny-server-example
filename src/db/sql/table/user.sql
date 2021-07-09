create table if not exists `user` (
  -- index
  `id` int(8) unsigned zerofill not null auto_increment comment '本条记录的id',
  -- body
  `username` varchar(16) not null default '' comment '用户名',
  `email` varchar(32) not null default '' comment '邮箱，用于身份验证',
  `password` varchar(32) not null default '' comment '密码',
  `type` tinyint(1) unsigned not null default 3 comment '用户类型，1超级管理员，2管理员，3普通用户',
  -- required
  `is_valid` tinyint(1) unsigned not null default 1 comment '是否有效, 有效为 1, 无效为 0',
  `create_at` datetime not null default current_timestamp comment '创建时间',
  `update_at` datetime not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key (`id`),
  unique key `username_unique_index` (`username`),
  unique key `email_unique_index` (`email`)
) engine = InnoDB auto_increment = 0 default charset = utf8 comment '用户';
