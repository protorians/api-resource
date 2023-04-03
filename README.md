# Protorians APIREST

Protorians APIREST est un gestionnaire d'API REST.

# Installation

### Via PNPM

`pnpm install @protorians/api-rest`

### Via YARN

`yarn add @protorians/api-rest`

### Via NPM

`npm install @protorians/api-rest`

# Typage

## Charge utile : Payload

Définir la liste des paramètres à passer dans le body.

```javascript
interface myPayload extends IEndpointPayload {
  id: number;
}
```

## Réponses

Définir la réponse attendu.

```javascript
interface myResponse extends IEndpointResponse {
  response: boolean;
  cause: string;
}
```

## Serveur des points de chute

```javascript
const myAPIServer = () =>
  new APIREST("https://example.com/api", {
    cache: "no-store",
  });
```

## Utilisation du point de chute & méthodes

Méthode GET

```javascript
const myEndpoint = () => useEndpoint<
  myPayload,
  myResponse
>().use( myAPIServer() ).route('/my-end-point').method('GET')
```

Méthode POST

```javascript
const myEndpoint = () => useEndpoint<
  myPayload,
  myResponse
>().use( myAPIServer() ).route('/my-end-point').method('POST')
```

Méthode PUT

```javascript
const myEndpoint = () => useEndpoint<
  myPayload,
  myResponse
>().use( myAPIServer() ).route('/my-end-point').method('PUT')
```

Méthode PATCH

```javascript
const myEndpoint = () => useEndpoint<
  myPayload,
  myResponse
>().use( myAPIServer() ).route('/my-end-point').method('PATCH')
```

Méthode DELETE

```javascript
const myEndpoint = () => useEndpoint<
  myPayload,
  myResponse
>().use( myAPIServer() ).route('/my-end-point').method('DELETE')
```

## Resolution du point de chute

```javascript
myEndpoint()
  .payload({
    id: 7,
  })
  .send()
  ?.then((response) => {
    console.log("Response", response);
  });
```

## License

Copyright 2023 — Protorians

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
