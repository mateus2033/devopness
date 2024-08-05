/* eslint-disable */
/**
 * devopness API
 * Devopness API - Painless essential DevOps to everyone 
 *
 * The version of the OpenAPI document: latest
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface ServiceGetStatus
 */
export interface ServiceGetStatus {
    /**
     * The ID of the environment this service is running in.
     * @type {number}
     * @memberof ServiceGetStatus
     */
    environment_id: number;
    /**
     * List of valid resource IDs
     * @type {Array<number>}
     * @memberof ServiceGetStatus
     */
    servers?: Array<number>;
}
