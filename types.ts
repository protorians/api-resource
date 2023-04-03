export declare type IAirMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export declare interface IAirEndPoint<P extends IEndpointPayload, R extends IEndpointResponse>{

	_route : string | number;

	_payload: IEndpointPayload;

	_method: IAirMethods;
	
	// _responses: IEndpointResponse;

	use( server : IAirServer ) : this;

	method( method : IAirMethods ) : this;

	route( route : string | number ) : this;

	slugs( ...slugs : (string | number)[] ) : this;

	payload( payload : P ) : this;

	// response( response : R ) : this;

	send() : Promise<R> | undefined;

}

export declare type IEndpointResponse = {

	[ R : string ] : any

}

export declare type IEndpointPayload = {

	[ P : string ] : any

}

export declare type AirStackEndPoints = {

}



export interface IAirServer{

	server : string;

	options : RequestInit | undefined;

	post<R extends IEndpointResponse>( stack : IAirEndPoint<IEndpointPayload, R> ) : Promise<R>;

	get<R extends IEndpointResponse>( stack : IAirEndPoint<IEndpointPayload, R> ) : Promise<R>;

	put<R extends IEndpointResponse>( stack : IAirEndPoint<IEndpointPayload, R> ) : Promise<R>;

	patch<R extends IEndpointResponse>( stack : IAirEndPoint<IEndpointPayload, R> ) : Promise<R>;

	delete<R extends IEndpointResponse>( stack : IAirEndPoint<IEndpointPayload, R> ) : Promise<R>;
	
}