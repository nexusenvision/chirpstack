/**
 * @fileoverview gRPC-Web generated client stub for api
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var common_common_pb = require('../common/common_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js')

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.api = require('./device_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.DeviceServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.DeviceServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.CreateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_DeviceService_Create = new grpc.web.MethodDescriptor(
  '/api.DeviceService/Create',
  grpc.web.MethodType.UNARY,
  proto.api.CreateDeviceRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.CreateDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.CreateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_DeviceService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.CreateDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.CreateDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/Create',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Create,
      callback);
};


/**
 * @param {!proto.api.CreateDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/Create',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetDeviceRequest,
 *   !proto.api.GetDeviceResponse>}
 */
const methodDescriptor_DeviceService_Get = new grpc.web.MethodDescriptor(
  '/api.DeviceService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.GetDeviceRequest,
  proto.api.GetDeviceResponse,
  /**
   * @param {!proto.api.GetDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetDeviceRequest,
 *   !proto.api.GetDeviceResponse>}
 */
const methodInfo_DeviceService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.GetDeviceResponse,
  /**
   * @param {!proto.api.GetDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.GetDeviceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.GetDeviceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/Get',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Get,
      callback);
};


/**
 * @param {!proto.api.GetDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.GetDeviceResponse>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/Get',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.UpdateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_DeviceService_Update = new grpc.web.MethodDescriptor(
  '/api.DeviceService/Update',
  grpc.web.MethodType.UNARY,
  proto.api.UpdateDeviceRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.UpdateDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.UpdateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_DeviceService_Update = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.UpdateDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.UpdateDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/Update',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Update,
      callback);
};


/**
 * @param {!proto.api.UpdateDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/Update',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.DeleteDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_DeviceService_Delete = new grpc.web.MethodDescriptor(
  '/api.DeviceService/Delete',
  grpc.web.MethodType.UNARY,
  proto.api.DeleteDeviceRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.DeleteDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.DeleteDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_DeviceService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.DeleteDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.DeleteDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/Delete',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Delete,
      callback);
};


/**
 * @param {!proto.api.DeleteDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/Delete',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Delete);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ListDevicesRequest,
 *   !proto.api.ListDevicesResponse>}
 */
const methodDescriptor_DeviceService_List = new grpc.web.MethodDescriptor(
  '/api.DeviceService/List',
  grpc.web.MethodType.UNARY,
  proto.api.ListDevicesRequest,
  proto.api.ListDevicesResponse,
  /**
   * @param {!proto.api.ListDevicesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ListDevicesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ListDevicesRequest,
 *   !proto.api.ListDevicesResponse>}
 */
const methodInfo_DeviceService_List = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.ListDevicesResponse,
  /**
   * @param {!proto.api.ListDevicesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ListDevicesResponse.deserializeBinary
);


/**
 * @param {!proto.api.ListDevicesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.ListDevicesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ListDevicesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.list =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/List',
      request,
      metadata || {},
      methodDescriptor_DeviceService_List,
      callback);
};


/**
 * @param {!proto.api.ListDevicesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ListDevicesResponse>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.list =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/List',
      request,
      metadata || {},
      methodDescriptor_DeviceService_List);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.CreateDeviceKeysRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_DeviceService_CreateKeys = new grpc.web.MethodDescriptor(
  '/api.DeviceService/CreateKeys',
  grpc.web.MethodType.UNARY,
  proto.api.CreateDeviceKeysRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.CreateDeviceKeysRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.CreateDeviceKeysRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_DeviceService_CreateKeys = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.CreateDeviceKeysRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.CreateDeviceKeysRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.createKeys =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/CreateKeys',
      request,
      metadata || {},
      methodDescriptor_DeviceService_CreateKeys,
      callback);
};


/**
 * @param {!proto.api.CreateDeviceKeysRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.createKeys =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/CreateKeys',
      request,
      metadata || {},
      methodDescriptor_DeviceService_CreateKeys);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetDeviceKeysRequest,
 *   !proto.api.GetDeviceKeysResponse>}
 */
const methodDescriptor_DeviceService_GetKeys = new grpc.web.MethodDescriptor(
  '/api.DeviceService/GetKeys',
  grpc.web.MethodType.UNARY,
  proto.api.GetDeviceKeysRequest,
  proto.api.GetDeviceKeysResponse,
  /**
   * @param {!proto.api.GetDeviceKeysRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceKeysResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetDeviceKeysRequest,
 *   !proto.api.GetDeviceKeysResponse>}
 */
const methodInfo_DeviceService_GetKeys = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.GetDeviceKeysResponse,
  /**
   * @param {!proto.api.GetDeviceKeysRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceKeysResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetDeviceKeysRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.GetDeviceKeysResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.GetDeviceKeysResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.getKeys =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/GetKeys',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetKeys,
      callback);
};


/**
 * @param {!proto.api.GetDeviceKeysRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.GetDeviceKeysResponse>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.getKeys =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/GetKeys',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetKeys);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.UpdateDeviceKeysRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_DeviceService_UpdateKeys = new grpc.web.MethodDescriptor(
  '/api.DeviceService/UpdateKeys',
  grpc.web.MethodType.UNARY,
  proto.api.UpdateDeviceKeysRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.UpdateDeviceKeysRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.UpdateDeviceKeysRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_DeviceService_UpdateKeys = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.UpdateDeviceKeysRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.UpdateDeviceKeysRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.updateKeys =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/UpdateKeys',
      request,
      metadata || {},
      methodDescriptor_DeviceService_UpdateKeys,
      callback);
};


/**
 * @param {!proto.api.UpdateDeviceKeysRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.updateKeys =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/UpdateKeys',
      request,
      metadata || {},
      methodDescriptor_DeviceService_UpdateKeys);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.DeleteDeviceKeysRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_DeviceService_DeleteKeys = new grpc.web.MethodDescriptor(
  '/api.DeviceService/DeleteKeys',
  grpc.web.MethodType.UNARY,
  proto.api.DeleteDeviceKeysRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.DeleteDeviceKeysRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.DeleteDeviceKeysRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_DeviceService_DeleteKeys = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.DeleteDeviceKeysRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.DeleteDeviceKeysRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.deleteKeys =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/DeleteKeys',
      request,
      metadata || {},
      methodDescriptor_DeviceService_DeleteKeys,
      callback);
};


/**
 * @param {!proto.api.DeleteDeviceKeysRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.deleteKeys =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/DeleteKeys',
      request,
      metadata || {},
      methodDescriptor_DeviceService_DeleteKeys);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.FlushDevNoncesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_DeviceService_FlushDevNonces = new grpc.web.MethodDescriptor(
  '/api.DeviceService/FlushDevNonces',
  grpc.web.MethodType.UNARY,
  proto.api.FlushDevNoncesRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.FlushDevNoncesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.FlushDevNoncesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_DeviceService_FlushDevNonces = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.FlushDevNoncesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.FlushDevNoncesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.flushDevNonces =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/FlushDevNonces',
      request,
      metadata || {},
      methodDescriptor_DeviceService_FlushDevNonces,
      callback);
};


/**
 * @param {!proto.api.FlushDevNoncesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.flushDevNonces =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/FlushDevNonces',
      request,
      metadata || {},
      methodDescriptor_DeviceService_FlushDevNonces);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ActivateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_DeviceService_Activate = new grpc.web.MethodDescriptor(
  '/api.DeviceService/Activate',
  grpc.web.MethodType.UNARY,
  proto.api.ActivateDeviceRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.ActivateDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ActivateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_DeviceService_Activate = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.ActivateDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.ActivateDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.activate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/Activate',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Activate,
      callback);
};


/**
 * @param {!proto.api.ActivateDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.activate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/Activate',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Activate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.DeactivateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_DeviceService_Deactivate = new grpc.web.MethodDescriptor(
  '/api.DeviceService/Deactivate',
  grpc.web.MethodType.UNARY,
  proto.api.DeactivateDeviceRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.DeactivateDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.DeactivateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_DeviceService_Deactivate = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.DeactivateDeviceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.DeactivateDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.deactivate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/Deactivate',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Deactivate,
      callback);
};


/**
 * @param {!proto.api.DeactivateDeviceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.deactivate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/Deactivate',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Deactivate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetDeviceActivationRequest,
 *   !proto.api.GetDeviceActivationResponse>}
 */
const methodDescriptor_DeviceService_GetActivation = new grpc.web.MethodDescriptor(
  '/api.DeviceService/GetActivation',
  grpc.web.MethodType.UNARY,
  proto.api.GetDeviceActivationRequest,
  proto.api.GetDeviceActivationResponse,
  /**
   * @param {!proto.api.GetDeviceActivationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceActivationResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetDeviceActivationRequest,
 *   !proto.api.GetDeviceActivationResponse>}
 */
const methodInfo_DeviceService_GetActivation = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.GetDeviceActivationResponse,
  /**
   * @param {!proto.api.GetDeviceActivationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceActivationResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetDeviceActivationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.GetDeviceActivationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.GetDeviceActivationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.getActivation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/GetActivation',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetActivation,
      callback);
};


/**
 * @param {!proto.api.GetDeviceActivationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.GetDeviceActivationResponse>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.getActivation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/GetActivation',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetActivation);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetRandomDevAddrRequest,
 *   !proto.api.GetRandomDevAddrResponse>}
 */
const methodDescriptor_DeviceService_GetRandomDevAddr = new grpc.web.MethodDescriptor(
  '/api.DeviceService/GetRandomDevAddr',
  grpc.web.MethodType.UNARY,
  proto.api.GetRandomDevAddrRequest,
  proto.api.GetRandomDevAddrResponse,
  /**
   * @param {!proto.api.GetRandomDevAddrRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetRandomDevAddrResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetRandomDevAddrRequest,
 *   !proto.api.GetRandomDevAddrResponse>}
 */
const methodInfo_DeviceService_GetRandomDevAddr = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.GetRandomDevAddrResponse,
  /**
   * @param {!proto.api.GetRandomDevAddrRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetRandomDevAddrResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetRandomDevAddrRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.GetRandomDevAddrResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.GetRandomDevAddrResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.getRandomDevAddr =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/GetRandomDevAddr',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetRandomDevAddr,
      callback);
};


/**
 * @param {!proto.api.GetRandomDevAddrRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.GetRandomDevAddrResponse>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.getRandomDevAddr =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/GetRandomDevAddr',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetRandomDevAddr);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetDeviceMetricsRequest,
 *   !proto.api.GetDeviceMetricsResponse>}
 */
const methodDescriptor_DeviceService_GetMetrics = new grpc.web.MethodDescriptor(
  '/api.DeviceService/GetMetrics',
  grpc.web.MethodType.UNARY,
  proto.api.GetDeviceMetricsRequest,
  proto.api.GetDeviceMetricsResponse,
  /**
   * @param {!proto.api.GetDeviceMetricsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceMetricsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetDeviceMetricsRequest,
 *   !proto.api.GetDeviceMetricsResponse>}
 */
const methodInfo_DeviceService_GetMetrics = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.GetDeviceMetricsResponse,
  /**
   * @param {!proto.api.GetDeviceMetricsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceMetricsResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetDeviceMetricsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.GetDeviceMetricsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.GetDeviceMetricsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.getMetrics =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/GetMetrics',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetMetrics,
      callback);
};


/**
 * @param {!proto.api.GetDeviceMetricsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.GetDeviceMetricsResponse>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.getMetrics =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/GetMetrics',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetMetrics);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetDeviceStatsRequest,
 *   !proto.api.GetDeviceStatsResponse>}
 */
const methodDescriptor_DeviceService_GetStats = new grpc.web.MethodDescriptor(
  '/api.DeviceService/GetStats',
  grpc.web.MethodType.UNARY,
  proto.api.GetDeviceStatsRequest,
  proto.api.GetDeviceStatsResponse,
  /**
   * @param {!proto.api.GetDeviceStatsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceStatsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetDeviceStatsRequest,
 *   !proto.api.GetDeviceStatsResponse>}
 */
const methodInfo_DeviceService_GetStats = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.GetDeviceStatsResponse,
  /**
   * @param {!proto.api.GetDeviceStatsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceStatsResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetDeviceStatsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.GetDeviceStatsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.GetDeviceStatsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.getStats =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/GetStats',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetStats,
      callback);
};


/**
 * @param {!proto.api.GetDeviceStatsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.GetDeviceStatsResponse>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.getStats =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/GetStats',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetStats);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.EnqueueDeviceQueueItemRequest,
 *   !proto.api.EnqueueDeviceQueueItemResponse>}
 */
const methodDescriptor_DeviceService_Enqueue = new grpc.web.MethodDescriptor(
  '/api.DeviceService/Enqueue',
  grpc.web.MethodType.UNARY,
  proto.api.EnqueueDeviceQueueItemRequest,
  proto.api.EnqueueDeviceQueueItemResponse,
  /**
   * @param {!proto.api.EnqueueDeviceQueueItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.EnqueueDeviceQueueItemResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.EnqueueDeviceQueueItemRequest,
 *   !proto.api.EnqueueDeviceQueueItemResponse>}
 */
const methodInfo_DeviceService_Enqueue = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.EnqueueDeviceQueueItemResponse,
  /**
   * @param {!proto.api.EnqueueDeviceQueueItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.EnqueueDeviceQueueItemResponse.deserializeBinary
);


/**
 * @param {!proto.api.EnqueueDeviceQueueItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.EnqueueDeviceQueueItemResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.EnqueueDeviceQueueItemResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.enqueue =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/Enqueue',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Enqueue,
      callback);
};


/**
 * @param {!proto.api.EnqueueDeviceQueueItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.EnqueueDeviceQueueItemResponse>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.enqueue =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/Enqueue',
      request,
      metadata || {},
      methodDescriptor_DeviceService_Enqueue);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.FlushDeviceQueueRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_DeviceService_FlushQueue = new grpc.web.MethodDescriptor(
  '/api.DeviceService/FlushQueue',
  grpc.web.MethodType.UNARY,
  proto.api.FlushDeviceQueueRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.FlushDeviceQueueRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.FlushDeviceQueueRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_DeviceService_FlushQueue = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.FlushDeviceQueueRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.FlushDeviceQueueRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.flushQueue =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/FlushQueue',
      request,
      metadata || {},
      methodDescriptor_DeviceService_FlushQueue,
      callback);
};


/**
 * @param {!proto.api.FlushDeviceQueueRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.flushQueue =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/FlushQueue',
      request,
      metadata || {},
      methodDescriptor_DeviceService_FlushQueue);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetDeviceQueueItemsRequest,
 *   !proto.api.GetDeviceQueueItemsResponse>}
 */
const methodDescriptor_DeviceService_GetQueue = new grpc.web.MethodDescriptor(
  '/api.DeviceService/GetQueue',
  grpc.web.MethodType.UNARY,
  proto.api.GetDeviceQueueItemsRequest,
  proto.api.GetDeviceQueueItemsResponse,
  /**
   * @param {!proto.api.GetDeviceQueueItemsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceQueueItemsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetDeviceQueueItemsRequest,
 *   !proto.api.GetDeviceQueueItemsResponse>}
 */
const methodInfo_DeviceService_GetQueue = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.GetDeviceQueueItemsResponse,
  /**
   * @param {!proto.api.GetDeviceQueueItemsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDeviceQueueItemsResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetDeviceQueueItemsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.GetDeviceQueueItemsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.GetDeviceQueueItemsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.DeviceServiceClient.prototype.getQueue =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.DeviceService/GetQueue',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetQueue,
      callback);
};


/**
 * @param {!proto.api.GetDeviceQueueItemsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.GetDeviceQueueItemsResponse>}
 *     Promise that resolves to the response
 */
proto.api.DeviceServicePromiseClient.prototype.getQueue =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.DeviceService/GetQueue',
      request,
      metadata || {},
      methodDescriptor_DeviceService_GetQueue);
};


module.exports = proto.api;

