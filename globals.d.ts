declare module '@protorians/air-rest/example' {
  export {};

}
declare module '@protorians/air-rest/index' {
  import type { IAirRestServer, IAirRestEndPoint, IAirMethods, IEndpointPayload, IEndpointResponse } from "@protorians/air-rest/types";
  export function stringifyPayload(payload: IEndpointPayload): string[];
  export function render<R extends IEndpointResponse>(endpoint: RequestInfo, options: RequestInit | undefined): Promise<R>;
  export function useEndpoint<P extends IEndpointPayload, R extends IEndpointResponse>(): AirRestEndPoint<P, R>;
  /**
   * Création d'un point de chute
   */
  export class AirRestEndPoint<P extends IEndpointPayload, R extends IEndpointResponse> implements IAirRestEndPoint<P, R> {
      #private;
      get _route(): string | number;
      get _payload(): P;
      get _method(): IAirMethods;
      /**
       * Utilisation avec un serveur de points de chutes
       * @param rest
       */
      use(rest: IAirRestServer): this;
      method(method: IAirMethods): this;
      route(route: string | number): this;
      slugs(...slugs: (string | number)[]): this;
      payload(payload: P): this;
      send(): Promise<R> | undefined;
  }
  export function transpilatePayload(payload?: object): BodyInit;
  export class AirRestServer implements IAirRestServer {
      server: string;
      options: RequestInit | undefined;
      constructor(server: string, options: RequestInit | undefined);
      post<R extends IEndpointResponse>(endpoint: IAirRestEndPoint<IEndpointPayload, R>): Promise<R>;
      get<R extends IEndpointResponse>(endpoint: IAirRestEndPoint<IEndpointPayload, R>): Promise<R>;
      put<R extends IEndpointResponse>(endpoint: IAirRestEndPoint<IEndpointPayload, R>): Promise<R>;
      patch<R extends IEndpointResponse>(endpoint: IAirRestEndPoint<IEndpointPayload, R>): Promise<R>;
      delete<R extends IEndpointResponse>(endpoint: IAirRestEndPoint<IEndpointPayload, R>): Promise<R>;
  }
  export default class AirRest {
      static Server: typeof AirRestServer;
      static Endpoint: typeof AirRestEndPoint;
  }

}
declare module '@protorians/air-rest/types' {
  export type IAirMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  export interface IAirRestEndPoint<P extends IEndpointPayload, R extends IEndpointResponse> {
      _route: string | number;
      _payload: IEndpointPayload;
      _method: IAirMethods;
      use(server: IAirRestServer): this;
      method(method: IAirMethods): this;
      route(route: string | number): this;
      slugs(...slugs: (string | number)[]): this;
      payload(payload: P): this;
      send(): Promise<R> | undefined;
  }
  export type IEndpointResponse = {
      [R: string]: any;
  };
  export type IEndpointPayload = {
      [P: string]: any;
  };
  export type AirStackEndPoints = {};
  export interface IAirRestServer {
      server: string;
      options: RequestInit | undefined;
      post<R extends IEndpointResponse>(stack: IAirRestEndPoint<IEndpointPayload, R>): Promise<R>;
      get<R extends IEndpointResponse>(stack: IAirRestEndPoint<IEndpointPayload, R>): Promise<R>;
      put<R extends IEndpointResponse>(stack: IAirRestEndPoint<IEndpointPayload, R>): Promise<R>;
      patch<R extends IEndpointResponse>(stack: IAirRestEndPoint<IEndpointPayload, R>): Promise<R>;
      delete<R extends IEndpointResponse>(stack: IAirRestEndPoint<IEndpointPayload, R>): Promise<R>;
  }

}
declare module '@protorians/air-rest' {
  import main = require('@protorians/air-rest/index');
  export = main;
}