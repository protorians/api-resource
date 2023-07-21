import type {
  IAirRestServer,
  IAirRestEndPoint,
  IAirMethods,
  IEndpointPayload,
  IEndpointResponse
} from "./types";



export function stringifyPayload(payload: IEndpointPayload): string[] {

  const out: string[] = [];

  Object.entries(payload).forEach(({ 0: key, 1: value }) => {

    if (typeof value == 'object') {

      out[out.length] = (`${key}=${encodeURIComponent(JSON.stringify(value))}`);

    }

    else { out[out.length] = (`${key}=${encodeURIComponent(value)}`); }

  });

  return out

}



export function render<R extends IEndpointResponse>(

  endpoint: RequestInfo,

  options: RequestInit | undefined

) {

  return new Promise<R>((done, fail) => {

    fetch(endpoint, { ...options })

      .then(r => r.json())

      .then(data => done(data as R))

      .catch(er => fail(er))

  })

}



export function useEndpoint<P extends IEndpointPayload, R extends IEndpointResponse>() {

  return new AirRestEndPoint<P, R>();

}

/**
 * Création d'un point de chute
 */
export class AirRestEndPoint<P extends IEndpointPayload, R extends IEndpointResponse> implements IAirRestEndPoint<P, R>{

  #rest: IAirRestServer | undefined = undefined;

  #route: string | number = '';

  #payload: P = {} as P;

  // #response: R = {} as R;

  #method: IAirMethods = 'GET';


  get _route() { return this.#route; }

  get _payload() { return this.#payload; }

  // get _responses(){ return this.#response; }

  get _method() { return this.#method; }


  /**
   * Utilisation avec un serveur de points de chutes
   * @param rest 
   */
  use(rest: IAirRestServer) {

    this.#rest = rest;

    return this;

  }

  method(method: IAirMethods) {

    this.#method = method;

    return this;

  }

  route(route: string | number) {

    this.#route = route;

    return this;

  }

  form(form: HTMLFormElement) {

    const data = new FormData(form);

    data.forEach((item, name) => this.#payload[name as keyof P] = item as P[keyof P]);

    return this;

  }

  slugs(...slugs: (string | number)[]) {

    slugs.forEach((slug, key) => {

      key++;

      this.#route = this._route.toString().replace(new RegExp(`\\$${key}`, 'gi'), `${slug}`)

    })

    return this;

  }

  payload(payload: P) {

    this.#payload = payload;

    return this;

  }

  // response( response : R ){

  //     this.#response = response;

  //     return this;

  // }


  send(): Promise<R> | undefined {

    switch (this._method) {

      case 'POST': return this.#rest?.post<R>(this);

      case 'PUT': return this.#rest?.put<R>(this);

      case 'PATCH': return this.#rest?.patch<R>(this);

      case 'DELETE': return this.#rest?.delete<R>(this);

      default: return this.#rest?.get<R>(this);

    }

  }

}



export function transpilatePayload(payload?: object): BodyInit {

  const formData = new FormData();

  if (payload) {

    Object.entries(payload).forEach(({ 0: name, 1: value }) =>

      formData.append(name, value)

    )

  }

  return formData;

}


export class AirRestServer implements IAirRestServer {

  server: string;

  options: RequestInit | undefined;

  constructor(server: string, options: RequestInit | undefined) {

    this.server = server;

    this.options = options;

  }

  post<R extends IEndpointResponse>(endpoint: IAirRestEndPoint<IEndpointPayload, R>): Promise<R> {

    return render<R>(

      `${this.server}${endpoint._route as string}`, {

      method: 'POST',

      body: transpilatePayload(endpoint._payload),

    }

    )

  }

  get<R extends IEndpointResponse>(endpoint: IAirRestEndPoint<IEndpointPayload, R>) {

    const query = endpoint._payload ? stringifyPayload(endpoint._payload).join('&') : '';

    return render<R>(

      `${this.server}${endpoint._route as string}${endpoint._payload ? "?" + query : ''}`, {

      ...this.options,

      method: 'GET',

    }

    )

  }

  put<R extends IEndpointResponse>(endpoint: IAirRestEndPoint<IEndpointPayload, R>) {

    return render<R>(

      `${this.server}${endpoint._route as string}`, {

      ...this.options,

      method: 'PUT',

      body: transpilatePayload(endpoint._payload),

    }

    )

  }

  patch<R extends IEndpointResponse>(endpoint: IAirRestEndPoint<IEndpointPayload, R>) {

    return render<R>(

      `${this.server}${endpoint._route as string}`, {

      ...this.options,

      method: 'PATCH',

      body: transpilatePayload(endpoint._payload),

    }

    )

  }

  delete<R extends IEndpointResponse>(endpoint: IAirRestEndPoint<IEndpointPayload, R>) {

    return render<R>(

      `${this.server}${endpoint._route as string}`, {

      ...this.options,

      method: 'DELETE',

      body: transpilatePayload(endpoint._payload),

    })

  }

}





export default class AirRest {

  static Server = AirRestServer;

  static Endpoint = AirRestEndPoint;

}