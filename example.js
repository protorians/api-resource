import AirREST, { useEndpoint } from "./index";
const myAirServer = () => new AirREST.Server('https://example.com/api', {
    cache: 'no-store',
});
// Déclaration
const myEndpoint = () => useEndpoint().use(myAirServer()).route('/connect').method('POST');
// Usage
myEndpoint().payload({
    id: 7
}).send()?.then(response => {
    console.log('Response', response);
});
