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


import { CloudOsVersionCode } from './cloud-os-version-code';

/**
 * 
 * @export
 * @interface CloudServiceSettingsDigitalOceanDroplet
 */
export interface CloudServiceSettingsDigitalOceanDroplet {
    /**
     * The instance type to be launched on the cloud provider
     * @type {string}
     * @memberof CloudServiceSettingsDigitalOceanDroplet
     */
    instance_type: string;
    /**
     * Datacenter region where the cloud instance will be launched
     * @type {string}
     * @memberof CloudServiceSettingsDigitalOceanDroplet
     */
    region: string;
    /**
     * Human readable version of the server region
     * @type {string}
     * @memberof CloudServiceSettingsDigitalOceanDroplet
     */
    region_human_readable?: string;
    /**
     * 
     * @type {CloudOsVersionCode}
     * @memberof CloudServiceSettingsDigitalOceanDroplet
     */
    os_version_code: CloudOsVersionCode | null;
}

