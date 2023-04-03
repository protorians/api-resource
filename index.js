var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _AirEndPoint_rest, _AirEndPoint_route, _AirEndPoint_payload, _AirEndPoint_method;
export function stringifyPayload(payload) {
    const out = [];
    Object.entries(payload).forEach(({ 0: key, 1: value }) => {
        if (typeof value == 'object') {
            out[out.length] = (`${key}=${encodeURIComponent(JSON.stringify(value))}`);
        }
        else {
            out[out.length] = (`${key}=${encodeURIComponent(value)}`);
        }
    });
    return out;
}
export function render(endpoint, options) {
    return new Promise((done, fail) => {
        fetch(endpoint, { ...options })
            .then(r => r.json())
            .then(data => done(data))
            .catch(er => fail(er));
    });
}
export function useEndpoint() {
    return new AirEndPoint();
}
/**
 * Création d'un point de chute
 */
export class AirEndPoint {
    constructor() {
        _AirEndPoint_rest.set(this, undefined);
        _AirEndPoint_route.set(this, '');
        _AirEndPoint_payload.set(this, {});
        // #response: R = {} as R;
        _AirEndPoint_method.set(this, 'GET');
    }
    get _route() { return __classPrivateFieldGet(this, _AirEndPoint_route, "f"); }
    get _payload() { return __classPrivateFieldGet(this, _AirEndPoint_payload, "f"); }
    // get _responses(){ return this.#response; }
    get _method() { return __classPrivateFieldGet(this, _AirEndPoint_method, "f"); }
    /**
     * Utilisation avec un serveur de points de chutes
     * @param rest
     */
    use(rest) {
        __classPrivateFieldSet(this, _AirEndPoint_rest, rest, "f");
        return this;
    }
    method(method) {
        __classPrivateFieldSet(this, _AirEndPoint_method, method, "f");
        return this;
    }
    route(route) {
        __classPrivateFieldSet(this, _AirEndPoint_route, route, "f");
        return this;
    }
    slugs(...slugs) {
        slugs.forEach((slug, key) => {
            key++;
            __classPrivateFieldSet(this, _AirEndPoint_route, this._route.toString().replace(new RegExp(`\\$${key}`, 'gi'), `${slug}`), "f");
        });
        return this;
    }
    payload(payload) {
        __classPrivateFieldSet(this, _AirEndPoint_payload, payload, "f");
        return this;
    }
    // response( response : R ){
    //     this.#response = response;
    //     return this;
    // }
    send() {
        switch (this._method) {
            case 'POST': return __classPrivateFieldGet(this, _AirEndPoint_rest, "f")?.post(this);
            case 'PUT': return __classPrivateFieldGet(this, _AirEndPoint_rest, "f")?.put(this);
            case 'PATCH': return __classPrivateFieldGet(this, _AirEndPoint_rest, "f")?.patch(this);
            case 'DELETE': return __classPrivateFieldGet(this, _AirEndPoint_rest, "f")?.delete(this);
            default: return __classPrivateFieldGet(this, _AirEndPoint_rest, "f")?.get(this);
        }
    }
}
_AirEndPoint_rest = new WeakMap(), _AirEndPoint_route = new WeakMap(), _AirEndPoint_payload = new WeakMap(), _AirEndPoint_method = new WeakMap();
export class AirServer {
    constructor(server, options) {
        this.server = server;
        this.options = options;
    }
    post(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            method: 'POST',
            body: JSON.stringify((endpoint._payload || null)),
        });
    }
    get(endpoint) {
        const query = endpoint._payload ? stringifyPayload(endpoint._payload).join('&') : '';
        return render(`${this.server}${endpoint._route}${endpoint._payload ? "?" + query : ''}`, {
            method: 'GET',
        });
    }
    put(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            method: 'PUT',
            body: JSON.stringify((endpoint._payload || null)),
        });
    }
    patch(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            method: 'PATCH',
            body: JSON.stringify((endpoint._payload || null)),
        });
    }
    delete(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            method: 'DELETE',
            body: JSON.stringify((endpoint._payload || null)),
        });
    }
}
export default class AirRest {
}
AirRest.Server = AirServer;
AirRest.Endpoint = AirEndPoint;
