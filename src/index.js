const http = require('http');
const getUsers = require('./modules/users');

const server = http.createServer((request, response) => {

  const UrlAfterQuestion = request.url.replace(/^.*\?/, '');  //  удалить ? и до

  // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
  if (!request.url.includes('?')) {
    response.status = 200;
    response.header = "Content-Type: text/plain";
    response.write("Hello, world");
    response.end();
    return;
  }

  if (UrlAfterQuestion.startsWith('hello')) {
    const urlAfterEqual = UrlAfterQuestion.split('=');
    let name = '';
    if (urlAfterEqual[1]) {
      name = urlAfterEqual[1].trim();
    } else {
      name = '';
    }

    if (name === '') {
      // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
      response.status = 400;
      response.header = "Content-Type: text/plain";
      response.write("Enter a name");
    } else {
      // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
      response.status = 200;
      response.header = "Content-Type: text/plain";
      response.write(`Hello, ${name}.`);
    }
    response.end();
    return;
  }

  // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
  if (UrlAfterQuestion === 'users') {
    response.status = 200;
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }

  // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
  response.status = 500;
  response.end();


 /* if (request.url === '/users') {
    response.status = 200;
    response.statusMessage = "ok";
    response.header = "Content-Type: application/json"
    response.write(getUsers());
    response.end();

    return;
  }
  response.status = 200;
  response.statusMessage = "ok";
  response.header = "Content-Type: text/plain"
  response.write("Hello, world");
  response.end();*/

});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
})

// const hello = require('./modules/hello-module')
// hello()