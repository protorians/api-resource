import type { 
  IAPIREST, 
  IAPIEndpoint, 
  IAPIMethods, 
  IEndpointPayload, 
  IEndpointResponse 
} from "./types";



export function stringifyPayload( payload : IEndpointPayload ){

  const out : string[] = [];

  Object.entries( payload ).forEach( ({ 0: key, 1: value }) => {

    if( typeof value == 'object' ){
        
      out[ out.length ] = (`${ key }=${ encodeURIComponent( JSON.stringify(value) ) }`);

    }

    else{ out[ out.length ] = (`${ key }=${ encodeURIComponent( value ) }`); }

  } );

  return out
    
}



export function render<R extends IEndpointResponse>( 
    
    endpoint : RequestInfo, 
    
    options : RequestInit | undefined
    
){

  return new Promise<R>( (done, fail ) => {

      fetch( endpoint, { ...options })

      .then(r => r.json() )
      
      .then( data => done( data as R ) )

      .catch( er => fail( er ) )
      
  })
    
}



export function useEndpoint<P extends IEndpointPayload, R extends IEndpointResponse>(){

  return new APIEndpoint<P, R>();
    
}

export class APIEndpoint<P extends IEndpointPayload, R extends IEndpointResponse> implements IAPIEndpoint<P, R>{

  #rest : IAPIREST | undefined = undefined;

  #route : string | number = '';

  #payload: P = {} as P;
  
  // #response: R = {} as R;

  #method: IAPIMethods = 'GET';


  get _route(){ return this.#route; }

  get _payload(){ return this.#payload; }

  // get _responses(){ return this.#response; }

  get _method(){ return this.#method; }


use( rest : IAPIREST ){

    this.#rest = rest;

    return this;
      
  }
  
  method( method : IAPIMethods ){

    this.#method = method;

    return this;
      
  }

  route( route : string | number ){
      
    this.#route = route;
    
    return this;
      
  }

  slugs( ...slugs : (string | number)[] ){
    
    slugs.forEach( (slug, key ) => {

        key++;
    
        this.#route = this._route.toString().replace( new RegExp(`\\$${ key }`, 'gi'), `${ slug }` )
        
    })

    return this;
      
  }
  
  payload( payload : P ){
    
    this.#payload = payload;
    
    return this;
    
  }
  
  // response( response : R ){
      
  //     this.#response = response;
      
  //     return this;

  // }
  

  send() : Promise<R> | undefined{

    switch( this._method ){

      case 'POST': return this.#rest?.post<R>( this );
      
      case 'PUT': return this.#rest?.put<R>( this );

      case 'PATCH': return this.#rest?.patch<R>( this );
      
      case 'DELETE': return this.#rest?.delete<R>( this );
      
      default: return this.#rest?.get<R>( this );
      
    }
      
  }
    
}



export default class APIREST implements IAPIREST{

    server : string;

    options : RequestInit | undefined;
    
    constructor( server : string, options : RequestInit | undefined ){

      this.server = server;

      this.options = options;

    }

    post<R extends IEndpointResponse>( endpoint : IAPIEndpoint<IEndpointPayload, R> ): Promise<R>{
  
      return render<R>(
        
        `${ this.server }${ endpoint._route as string }`, {

          method: 'POST',

          body: JSON.stringify((endpoint._payload || null) as BodyInit),

        }
  
      )
  
    }

    get<R extends IEndpointResponse>( endpoint : IAPIEndpoint<IEndpointPayload, R> ){

      const query = endpoint._payload ? stringifyPayload( endpoint._payload ).join('&') : ''; 
  
      return render<R>(
        
        `${ this.server }${ endpoint._route as string }${ endpoint._payload ? "?" + query : '' }`, {

          method: 'GET',

        }
  
      )
    
    }

    put<R extends IEndpointResponse>( endpoint : IAPIEndpoint<IEndpointPayload, R> ){
  
      return render<R>(
        
        `${ this.server }${ endpoint._route as string }`, {

          method: 'PUT',

          body: JSON.stringify((endpoint._payload || null) as BodyInit),

        }

      )
    
    }

    patch<R extends IEndpointResponse>( endpoint : IAPIEndpoint<IEndpointPayload, R> ){
  
      return render<R>(
        
        `${ this.server }${ endpoint._route as string }`, {

          method: 'PATCH',

          body: JSON.stringify((endpoint._payload || null) as BodyInit),

        }

      )
  
    }

    delete<R extends IEndpointResponse>( endpoint : IAPIEndpoint<IEndpointPayload, R> ){
  
      return render<R>(
        
        `${ this.server }${ endpoint._route as string }`, {

          method: 'DELETE',

          body: JSON.stringify((endpoint._payload || null) as BodyInit),

        }

      )
    
    }

}