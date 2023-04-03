# Protorians AirREST

Protorians AirREST est un gestionnaire d'API REST côté client.

# Installation

### Via PNPM

`pnpm install @protorians/api-rest`

### Via YARN

`yarn add @protorians/api-rest`

### Via NPM

`npm install @protorians/api-rest`

# Importations

Toute la classe en `default`

```typescript
import AirREST from "@protorians/air-rest";
```

```typescript
import { AirEndPoint, AirServer } from "@protorians/air-rest";
```

---

# Typage

## IAirMethods

`'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'`

## IEndpointResponse

```typescript
{
  [ R : string ] : any
}
```

## IEndpointPayload

```typescript
{
  [ P : string ] : any
}
```

### À vous de déinir : Payload — Charge utile

Définir la liste des paramètres à passer dans le body du fetch (BodyInit) sous forme d'object

```typescript
interface myPayload extends IEndpointPayload {
  id: number;
}
```

### À vous de déinir : Réponses

Définir la réponse attendu.

```typescript
interface myResponse extends IEndpointResponse {
  response: boolean;
  cause: string;
}
```

---

# Utilisation

## Serveur des points de chute

```typescript
const myAirServer = () =>
  new AirREST.Server("https://example.com/api", {
    cache: "no-store",
  });
```

## Utilisation du point de chute & méthodes

Méthode GET

```typescript
const myEndpoint = () =>
  useEndpoint<myPayload, myResponse>()
    .use(myAirServer())
    .route("/my-end-point")
    .method("GET");
```

Méthode POST

```typescript
const myEndpoint = () =>
  useEndpoint<myPayload, myResponse>()
    .use(myAirServer())
    .route("/my-end-point")
    .method("POST");
```

Méthode PUT

```typescript
const myEndpoint = () =>
  useEndpoint<myPayload, myResponse>()
    .use(myAirServer())
    .route("/my-end-point")
    .method("PUT");
```

Méthode PATCH

```typescript
const myEndpoint = () =>
  useEndpoint<myPayload, myResponse>()
    .use(myAirServer())
    .route("/my-end-point")
    .method("PATCH");
```

Méthode DELETE

```typescript
const myEndpoint = () =>
  useEndpoint<myPayload, myResponse>()
    .use(myAirServer())
    .route("/my-end-point")
    .method("DELETE");
```

## Resolution du point de chute

```typescript
myEndpoint()
  .payload({
    id: 7,
  })
  .send()
  ?.then((response) => {
    console.log("Response", response);
  });
```

---

# Classe : AirServer

## AirServer

Création du server de point de chute

```typescript
const server = new AirServer("https://exemple.com/api");
```

Avec options

```typescript
const server = new AirServer("https://exemple.com/api", {
  cache: "no-store",
});
```

\* Les options sont du même type que ceux de la fonction fecth `RequestInit`

## AirServer.post

Resoudre le point de chute avec la méthode `POST`

```typescript
const server = new AirServer("https://exemple.com/api");
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
...
server.post<ResponseInterface>( endpoint ).then( response => console.log(response) )
```

## AirServer.get

Resoudre le point de chute avec la méthode `GET`

```typescript
const server = new AirServer("https://exemple.com/api");
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
...
server.get<ResponseInterface>( endpoint ).then( response => console.log(response) )
```

## AirServer.put

Resoudre le point de chute avec la méthode `PUT`

```typescript
const server = new AirServer("https://exemple.com/api");
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
...
server.put<ResponseInterface>( endpoint ).then( response => console.log(response) )
```

## AirServer.patch

Resoudre le point de chute avec la méthode `PATCH`

```typescript
const server = new AirServer("https://exemple.com/api");
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
...
server.patch<ResponseInterface>( endpoint ).then( response => console.log(response) )
```

## AirServer.delete

Resoudre le point de chute avec la méthode `DELETE`

```typescript
const server = new AirServer("https://exemple.com/api");
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
...
server.delete<ResponseInterface>( endpoint ).then( response => console.log(response) )
```

---

# Classe : AirEndPoint

## AirEndPoint

Création d'un point de chute

```typescript
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
```

## AirEndPoint.\_route

La route utilisé

```typescript
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
endpoint.route("/test");
console.log(endpoint._route); // test

endpoint.route("/hello");
console.log(endpoint._route); // hello
```

## AirEndPoint.\_payload

Les paramètres de la requête utilisé

```typescript
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
endpoint.payload({
  test: "test",
});
console.log(endpoint._payload); // { "test" : test" }

endpoint.payload({
  test: "hello",
});
console.log(endpoint._payload); // { "test" : hello" }
```

## AirEndPoint.\_method

La méthode de la requête utilisé

```typescript
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
endpoint.method("GET");
console.log(endpoint._method); // GET

endpoint.method("POST");
console.log(endpoint._method); // POST
```

## AirEndPoint.use

Utilisation avec un serveur de points de chutes

```typescript
const server = new AirServer();
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
endpoint.use(server);
```

## AirEndPoint.method

Definir la méthode de la requête

- method : `IAirMethods`

```typescript
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
endpoint.method("GET");
```

## AirEndPoint.route

Definir la route du point de chute de la requête

- route : `string`

```typescript
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
endpoint.route("/my-endpoint-route");
```

## AirEndPoint.slugs

Definir des variables et leurs positions dans la route. Dans le cadre où la route serait générique, donc comporterait par exemple des sous-dossiers.

- ...slugs : `(string | number)[]`

Exemple :
Pour `my-endpoint-route/{user-id}`, la route à utiliser doit être `my-endpoint-route/{$1}`

```typescript
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
endpoint.route("/my-endpoint-route/$1").slugs("user-id-here");
```

## AirEndPoint.payload

Definir la charge utile (paramètres dans la requête) à envoyer au point de chute.

- payload : `PayloadInterface`

```typescript
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
endpoint.payload({
  param1: "value-1",
  param2: "value-2",
});
```

## AirEndPoint.send

Resoudre le point de chute executant les caratéristiques construites

```typescript
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
endpoint.send();
```

Exemple de construction de point de chute

```typescript
const endpoint = new AirEndPoint<PayloadInterface, ResponseInterface>();
endpoint

  // Definition du serveur
  .use(
    new AirServer("https://example.com/api", {
      cache: "no-store",
    })
  )

  // Route Générique
  .route("/my-end-point/$1/$2")

  // Mise à jour de la route avec de nouveau paramètre
  .slugs("slug-1", "slug-2")

  // Paramètres
  .payload({
    param1: "value-1",
    param2: "value-2",
  })

  //Envoie
  .send();
```

---

# Fonctionnalité : stringifyPayload

Convertir un object de type `IEndpointPayload` en tableau de chaînes de caractères.

```typescript
const query = stringifyPayload({
  param1: "value-1",
  param2: "value-2",
});

console.log(query);
```

---

# Fonctionnalité : useEndpoint

Retourne une nouvelle instance de `AirEndPoint` pour enchaîner les définitions.

```typescript
useEndpoint<PayloadInterface, ResponseInterface>().route('/end-point-route')...
```

---

# Fonctionnalité : render

Résoudre un fetch.

- endpoint : `RequestInfo`
- options : `RequestInit | undefined`

```typescript
render('https//exemple.com/test', {
  cache: 'no-store,
  method: 'GET'
})
```

---

# Soutiens

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/iancarterwork)

---

## License MIT

Copyright 2023 — Protorians

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
