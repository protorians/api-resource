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
var _AirRestEndPoint_rest, _AirRestEndPoint_route, _AirRestEndPoint_payload, _AirRestEndPoint_method;
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
    return new AirRestEndPoint();
}
/**
 * Création d'un point de chute
 */
export class AirRestEndPoint {
    constructor() {
        _AirRestEndPoint_rest.set(this, undefined);
        _AirRestEndPoint_route.set(this, '');
        _AirRestEndPoint_payload.set(this, {});
        // #response: R = {} as R;
        _AirRestEndPoint_method.set(this, 'GET');
    }
    get _route() { return __classPrivateFieldGet(this, _AirRestEndPoint_route, "f"); }
    get _payload() { return __classPrivateFieldGet(this, _AirRestEndPoint_payload, "f"); }
    // get _responses(){ return this.#response; }
    get _method() { return __classPrivateFieldGet(this, _AirRestEndPoint_method, "f"); }
    /**
     * Utilisation avec un serveur de points de chutes
     * @param rest
     */
    use(rest) {
        __classPrivateFieldSet(this, _AirRestEndPoint_rest, rest, "f");
        return this;
    }
    method(method) {
        __classPrivateFieldSet(this, _AirRestEndPoint_method, method, "f");
        return this;
    }
    route(route) {
        __classPrivateFieldSet(this, _AirRestEndPoint_route, route, "f");
        return this;
    }
    slugs(...slugs) {
        slugs.forEach((slug, key) => {
            key++;
            __classPrivateFieldSet(this, _AirRestEndPoint_route, this._route.toString().replace(new RegExp(`\\$${key}`, 'gi'), `${slug}`), "f");
        });
        return this;
    }
    payload(payload) {
        __classPrivateFieldSet(this, _AirRestEndPoint_payload, payload, "f");
        return this;
    }
    // response( response : R ){
    //     this.#response = response;
    //     return this;
    // }
    send() {
        switch (this._method) {
            case 'POST': return __classPrivateFieldGet(this, _AirRestEndPoint_rest, "f")?.post(this);
            case 'PUT': return __classPrivateFieldGet(this, _AirRestEndPoint_rest, "f")?.put(this);
            case 'PATCH': return __classPrivateFieldGet(this, _AirRestEndPoint_rest, "f")?.patch(this);
            case 'DELETE': return __classPrivateFieldGet(this, _AirRestEndPoint_rest, "f")?.delete(this);
            default: return __classPrivateFieldGet(this, _AirRestEndPoint_rest, "f")?.get(this);
        }
    }
}
_AirRestEndPoint_rest = new WeakMap(), _AirRestEndPoint_route = new WeakMap(), _AirRestEndPoint_payload = new WeakMap(), _AirRestEndPoint_method = new WeakMap();
export class AirRestServer {
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
            ...this.options,
            method: 'GET',
        });
    }
    put(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            ...this.options,
            method: 'PUT',
            body: JSON.stringify((endpoint._payload || null)),
        });
    }
    patch(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            ...this.options,
            method: 'PATCH',
            body: JSON.stringify((endpoint._payload || null)),
        });
    }
    delete(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            ...this.options,
            method: 'DELETE',
            body: JSON.stringify((endpoint._payload || null)),
        });
    }
}
export default class AirRest {
}
AirRest.Server = AirRestServer;
AirRest.Endpoint = AirRestEndPoint;
