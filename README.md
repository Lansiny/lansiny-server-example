# lansiny-server-example 后端模板演示项目

## 系统配置

### 说明

项目部署之前需要修改默认配置，请按照以下配置方法进行配置。
>本项目使用npm的第三方模块`config`进行配置。`config/dev.js`是对开发环境进行配置，`config/production.js`是对生产环境进行配置，`config/default.js`是公共配置，开发环境和生产环境均适用，相同位置相同名称的配置会被前两种配置覆盖。配置文件可根据需要进行添加，详细方法请见[官方文档](https://github.com/lorenwest/node-config)

### 数据库

- 安装mysql、redis数据库。
- 在`config/dev.js`、`config/production.js`文件中修改数据库配置。
- 默认情况下，`mysql.remote`配置远端数据库，`mysql.test`配置本地数据库，可根据需要自行增添配置名称。
- 如果增添配置，需要在`config/constant.js` 文件中修改`mysqlType`字段，填入相应名称，项目运行后会使用这里所填名称的数据库配置进行连接。
- redis配置修改流程同mysql，找到相应位置修改即可。
- 其中`config/constant.js`和`config/file_pass_list.js`为自定义配置文件，不会出现在环境配置中。

### 邮件服务

- 使用任意邮箱账号开启POP3/SMTP服务，获取授权码。
- 在`config/default.js`文件中的`nodemailer`对象处修改邮件服务配置，在`pass`处填入授权码。

### 密钥

- 在`config/default.js`文件中的`key`对象处可配置所有密钥。
- `jwt`处可填入jwt的密钥用于验证token，不修改也可运行项目，但不安全。

### 文件上传过滤

- 在`config/file_pass_list.js`文件中添加字段增加支持的文件类型，在该字段的值中的数组添加支持该类型文件的后缀名列表。

### 超级管理员账号配置

1. 在`config/constant.js`中配置超级管理员账号信息。
2. `adminInitPassword`，超级管理员账号的初始密码。
3. `adminEamil`, 超级管理员账号的绑定邮箱。

### 其他配置

都在`config/constant.js`中，看注释吧。

## 系统部署

1. 本项目需要mysql和redis数据库，请提前安装，然后创建数据库，数据库名称默认`personal_anthology`，字符集`utf-8`，如果需要更改名称，请同时更改系统配置文件，配置方法在上面。
2. 本项目基于Node.js环境开发，需要提前安装，详细请见[Node.js](https://nodejs.org/en/)。
3. 本项目使用yarn包管理器需要使用`yarn install`或`yarn`命令安装依赖，不过仍然可以使用`npm install`。
4. 使用`yarn start`或`npm run start`运行项目，但建议使用pm2启动，详细请见[pm2](https://pm2.keymetrics.io/)。
