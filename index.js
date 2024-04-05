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
var _AirRestEndPoint_rest, _AirRestEndPoint_route, _AirRestEndPoint_payload, _AirRestEndPoint_method, _AirRestEndPoint_transpilate;
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
        _AirRestEndPoint_method.set(this, 'GET');
        _AirRestEndPoint_transpilate.set(this, true);
    }
    get _route() { return __classPrivateFieldGet(this, _AirRestEndPoint_route, "f"); }
    get _payload() { return __classPrivateFieldGet(this, _AirRestEndPoint_payload, "f"); }
    get _method() { return __classPrivateFieldGet(this, _AirRestEndPoint_method, "f"); }
    get _transpilate() { return __classPrivateFieldGet(this, _AirRestEndPoint_transpilate, "f"); }
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
    useForm(form) {
        const data = new FormData(form);
        __classPrivateFieldSet(this, _AirRestEndPoint_transpilate, false, "f");
        __classPrivateFieldSet(this, _AirRestEndPoint_payload, data, "f");
        return this;
    }
    useFormData(formData) {
        __classPrivateFieldSet(this, _AirRestEndPoint_transpilate, false, "f");
        __classPrivateFieldSet(this, _AirRestEndPoint_payload, formData, "f");
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
_AirRestEndPoint_rest = new WeakMap(), _AirRestEndPoint_route = new WeakMap(), _AirRestEndPoint_payload = new WeakMap(), _AirRestEndPoint_method = new WeakMap(), _AirRestEndPoint_transpilate = new WeakMap();
export function transpilatePayload(payload) {
    const formData = new FormData();
    if (payload) {
        Object.entries(payload).forEach(({ 0: name, 1: value }) => formData.append(name, value));
    }
    return formData;
}
export class AirRestServer {
    constructor(server, options) {
        this.server = server;
        this.options = options;
    }
    get(endpoint) {
        const query = endpoint._payload ? stringifyPayload(endpoint._payload).join('&') : '';
        return render(`${this.server}${endpoint._route}${endpoint._payload ? "?" + query : ''}`, {
            ...this.options,
            method: 'GET',
        });
    }
    post(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            ...this.options,
            method: 'POST',
            body: endpoint._transpilate ? transpilatePayload(endpoint._payload) : endpoint._payload,
        });
    }
    put(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            ...this.options,
            method: 'PUT',
            body: endpoint._transpilate ? transpilatePayload(endpoint._payload) : endpoint._payload,
        });
    }
    patch(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            ...this.options,
            method: 'PATCH',
            body: endpoint._transpilate ? transpilatePayload(endpoint._payload) : endpoint._payload,
        });
    }
    delete(endpoint) {
        return render(`${this.server}${endpoint._route}`, {
            ...this.options,
            method: 'DELETE',
            body: endpoint._transpilate ? transpilatePayload(endpoint._payload) : endpoint._payload,
        });
    }
}
export default class AirRest {
}
AirRest.Server = AirRestServer;
AirRest.Endpoint = AirRestEndPoint;
