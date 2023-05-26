import AirREST, { useEndpoint } from "./index";
import { IEndpointPayload, IEndpointResponse } from "./types";


interface myPayload extends IEndpointPayload {

  id: number;

}

interface myResponse extends IEndpointResponse {

  response: boolean;

  cause: string;

}



const myAirRestServer = () => new AirREST.Server('https://example.com/api', {

  cache: 'no-store',

})

// Déclaration
const myEndpoint = () => useEndpoint<
  myPayload,
  myResponse
>().use(myAirRestServer()).route('/connect').method('POST')

// Usage
myEndpoint().payload({
  id: 7
}).send()?.then(response => {

  console.log('Response', response)

})