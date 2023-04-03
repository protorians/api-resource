export declare type IAPIMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export declare interface IAPIEndpoint<P extends IEndpointPayload, R extends IEndpointResponse>{

	_route : string | number;

	_payload: IEndpointPayload;

	_method: IAPIMethods;
	
	// _responses: IEndpointResponse;

	use( rest : IAPIREST ) : this;

	method( method : IAPIMethods ) : this;

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



export interface IAPIREST{

	server : string;

	options : RequestInit | undefined;

	post<R extends IEndpointResponse>( stack : IAPIEndpoint<IEndpointPayload, R> ) : Promise<R>;

	get<R extends IEndpointResponse>( stack : IAPIEndpoint<IEndpointPayload, R> ) : Promise<R>;

	put<R extends IEndpointResponse>( stack : IAPIEndpoint<IEndpointPayload, R> ) : Promise<R>;

	patch<R extends IEndpointResponse>( stack : IAPIEndpoint<IEndpointPayload, R> ) : Promise<R>;

	delete<R extends IEndpointResponse>( stack : IAPIEndpoint<IEndpointPayload, R> ) : Promise<R>;
	
}