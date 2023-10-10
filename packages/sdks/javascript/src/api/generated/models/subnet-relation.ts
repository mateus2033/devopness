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


import { SubnetProvisionInput } from './subnet-provision-input';
import { SubnetType } from './subnet-type';

/**
 * 
 * @export
 * @interface SubnetRelation
 */
export interface SubnetRelation {
    /**
     * The unique id of the given record
     * @type {number}
     * @memberof SubnetRelation
     */
    id: number;
    /**
     * Numeric ID of the project to which the subnet belongs to
     * @type {number}
     * @memberof SubnetRelation
     */
    project_id: number;
    /**
     * Numeric ID of the environment to which the subnet belongs to
     * @type {number}
     * @memberof SubnetRelation
     */
    environment_id: number;
    /**
     * The id of the user who created the subnet
     * @type {number}
     * @memberof SubnetRelation
     */
    created_by: number;
    /**
     * Numeric ID of the network to which the subnet belongs to
     * @type {number}
     * @memberof SubnetRelation
     */
    network_id: number;
    /**
     * The subnet\'s name
     * @type {string}
     * @memberof SubnetRelation
     */
    name: string;
    /**
     * 
     * @type {SubnetType}
     * @memberof SubnetRelation
     */
    type: SubnetType;
    /**
     * True if this subnet is auto-generated or false if this was created by the user
     * @type {boolean}
     * @memberof SubnetRelation
     */
    is_auto_generated: boolean;
    /**
     * 
     * @type {SubnetProvisionInput}
     * @memberof SubnetRelation
     */
    provision_input: SubnetProvisionInput;
    /**
     * The date and time when the record was created
     * @type {string}
     * @memberof SubnetRelation
     */
    created_at: string;
    /**
     * The date and time when the record was last updated
     * @type {string}
     * @memberof SubnetRelation
     */
    updated_at: string;
}
