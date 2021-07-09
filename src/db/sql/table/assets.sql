create table if not exists `assets` (
  -- index
  `id` int(8) unsigned zerofill not null auto_increment comment '本条记录的id',
  -- body
  `type` varchar(16)  not null default '' comment '文件类型',
  `ext` varchar(8) not null default '' comment '文件拓展名',
  `name` varchar(64) not null default '' comment '文件名称',
  `path` varchar(128) not null default '' comment '文件路径',
  -- required
  `is_valid` tinyint(1) unsigned not null default 1 comment '是否有效, 有效为 1, 无效为 0',
  `create_at` datetime not null default current_timestamp comment '创建时间',
  `update_at` datetime not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key (`id`)
) engine = InnoDB auto_increment = 0 default charset = utf8 comment '资源';
