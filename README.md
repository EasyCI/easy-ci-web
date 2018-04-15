# EasyCI 前端程序

> EasyCI 是一个简易的持续集成服务，帮助软件开发人员快速的实施持续集成，实现编译、测试、打包、发布全流程自动化。

以下为 EasyCI 前端程序部署流程，更多帮助内容请参阅 **[EasyCI 帮助文档](https://github.com/EasyCI/easy-ci-doc/blob/master/README.md)**

## （一）准备

### 运行环境

- HTTP 服务器（推荐：[Nginx](https://nginx.org/)）

### 工具

- node 6.9.x+
- npm 3.x.x+
- Angular CLI

## （二）配置

### 准备编译环境

如果你的电脑里没有 Node.js 和 npm，请先安装 **[它们](https://nodejs.org/en/download/)**

> 请现在终端窗口中运行命令 `node -v` 和 `npm -v`，**来验证一下你正在运行 node 6.9.x 和 npm 3.x.x 以上的版本**。更老的版本可能会出现错误，更新的版本则没有问题。

然后全局安装 Angular CLI

```
npm install -g @angular/cli
```

> 请耐心等待，安装过程可能比较缓慢，如果因为网络问题安装失败，可配合网络代理工具或切换 npm 软件源。

> 可在终端窗口中运行命令 `ng -v`，**来验证一下你的 Angular CLI 是否安装成功。

### 获取主程序

通过以下命令，获取源代码

```
git clone -b master https://github.com/EasyCI/easy-ci-web.git
```

从以下位置，找到文件 `app-back-end-api.ts` ，修改开头的 **Back End Host Address** 条目参数为上一章节中 EasyCI 后端服务程序配置的主机地址。

```
cd ./easy-ci-web/src/app/core/
ls app-back-end-api.ts
```

通过以下命令，编译生成待部署的前端文件，结果放在 ./dist 文件夹下

```
cd ../../../   # 退回到 src/ 同级目录下
ng build --prod
ls dist
```

## （三）运行

可将上一步编译产生的 dist/ 前端文件，部署在常规的 HTTP 服务器上，这里推荐使用 [Nginx](https://nginx.org/)

注意在（Nginx） server 配置项中，使用 `try_files` 指向 `index.html`，解决刷新 404 的问题，更多 EasyCI 前端程序配置说明，请参阅对应服务器文档及 Angular 文档

> [Nginx - 文档](https://nginx.org/en/docs/)

> [Angular - 中文文档(部署)](https://www.angular.cn/guide/deployment)
