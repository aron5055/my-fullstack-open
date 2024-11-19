# Part 3

## Middleware

在处理 request 和响应 response 时调用，实现错误处理、日志记录、缓存、请求转发、权限校验等。

## MIME Type

type/subtype

```
text/html
image/jpeg
application/json
```

浏览器通过 MIME 来判断文件类型而不是文件拓展名

## res.send() vs res.json()

res.send() 可以处理多种数据类型，res.json() 只能处理 JSON 数据。

res.json() 会将非 JSON 数据转换为 JSON 字符串。

## CORS (跨域资源共享)

同源策略：scheme, host, port 必须都一样

CORS 允许跨域请求，需要浏览器和服务器同时支持。

预检：浏览器发送跨域请求，服务器负责响应。如果服务器不支持 CORS，浏览器会拦截请求。

“简单”请求不需要预检。

## MongoDB

MongoDB 是一个 NoSQL 数据库，采用 BSON 格式存储数据。

BSON 是一种二进制形式的 JSON，支持更多数据类型(Date, Binary Data)。

### Schema

Schema 映射到 MongoDB 集合 Collection。同时定义文档结构

### Documents

通过 BSON Document 存储数据。
