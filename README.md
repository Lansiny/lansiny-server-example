# lansiny-server-example 后端模板演示项目

## 开发计划

1. 日志系统。目前只能把操作日志存在mysql中。
2. 接口管理。目前暂无接口管理。
3. 上传文件过滤优化，将支持按业务分类文件。目前只能按照http规范中的文件类型分类。
4. 鉴权系统优化。目前还不算很安全，还有优化空间。
5. 集群处理。目前的启动文件app.js不支持集群，消息队列尚未加入。
6. redis的方法封装，目前只有string类型的set、get、del方法，但目前也只用到了这几个方法。

## 部署说明

1. 本项目需要mysql和redis数据库，请提前安装，然后创建数据库，数据库名称默认`lansiny-server-example`，字符集`utf-8`，如果需要更改名称，请同时更改系统配置文件。
2. 本项目基于Node.js环境开发，需要提前安装，详细请见[Node.js](https://nodejs.org/en/)。使用16.x版本的话，运行项目时会报一个毫无意义的警告。
3. 本项目使用yarn包管理器需要使用`yarn install`或`yarn`命令安装依赖，不过仍然可以使用`npm install`。
4. 使用`yarn start`或`npm run start`运行项目，但建议使用pm2启动，详细请见[pm2](https://pm2.keymetrics.io/)。

### 修改默认配置

项目部署之前需要修改默认配置，请按照以下方法进行修改。
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
- 在环境变量为`dev`和`test`的环境下，发送邮件验证码不会真的发送邮件，且会在返回值中返回邮件验证码。

### 密钥

- 在`config/default.js`文件中的`key`对象处可配置所有密钥。
- `jwt`处可填入jwt的密钥用于验证token，不修改也可运行项目，但不安全。

### 文件上传过滤

- 在`config/file_pass_list.js`文件中添加字段增加支持上传的文件类型，在该字段的值中的数组添加支持该类型文件的后缀名列表。
- 目前只能配置的文件类型仅支持http规范中的文件类型，如文件上传后的文件属性中的`image/jpg`，只能安装斜杠前面的`image`来配置，该仍然有待完善。
- 计划加入自定义的文件分类，可按业务来分类。

### 超级管理员账号

1. 请在`sec/db/sql/initial`下的`create_admin_user.sql`文件修改初始超级管理员的绑定邮箱和密码，密码需要进行一次MD5操作，32位小写。
2. 超级管理员账号的初始密码`admin`， 默认邮箱`admin@example`，默认用户名`admin`。
3. 后继开发会完善以cli的方式配置初始账号。

### 其他配置

- 都在`config/constant.js`中，看注释吧。反正也不多。
