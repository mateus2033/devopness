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

import { ApiBaseService } from "../../../services/ApiBaseService";
import { ApiResponse } from "../../../common/ApiResponse";
import { ArgumentNullException } from "../../../common/Exceptions";
import { ApiError } from '../../generated/models';
import { Invitation } from '../../generated/models';
import { InvitationCreate } from '../../generated/models';

/**
 * EnvironmentsInvitationsApiService - Auto-generated
 */
export class EnvironmentsInvitationsApiService extends ApiBaseService {
    /**
     * 
     * @summary Returns a list of all invitations belonging to an environment
     * @param {number} environmentId Numeric ID of the environment to get invitations from
     * @param {number} [page] Number of the page to be retrieved
     * @param {number} [perPage] Number of items returned per page
     */
    public async listEnvironmentInvitations(environmentId: number, page?: number, perPage?: number): Promise<ApiResponse<Array<Invitation>>> {
        if (environmentId === null || environmentId === undefined) {
            throw new ArgumentNullException('environmentId', 'listEnvironmentInvitations');
        }
        
        let queryString = '';
        const queryParams = { page: page, per_page: perPage, } as { [key: string]: any };
        for (const key in queryParams) {
            if (queryParams[key] === undefined || queryParams[key] === null) {
                continue;
            }

            queryString += (queryString? '&' : '') + `${key}=${encodeURI(queryParams[key])}`;
        }

        const requestUrl = '/environments/{environment_id}/invitations' + (queryString? `?${queryString}` : '');

        const response = await this.get <Array<Invitation>>(requestUrl.replace(`{${"environment_id"}}`, encodeURIComponent(String(environmentId))));
        return new ApiResponse(response);
    }

    /**
     * 
     * @summary Send invitation to user email to participate to a project\'s environment
     * @param {number} environmentId Numeric ID of the environment to invite a user
     * @param {InvitationCreate} invitationCreate A JSON object containing the email to send the invitation
     */
    public async sendInvitation(environmentId: number, invitationCreate: InvitationCreate): Promise<ApiResponse<Invitation>> {
        if (environmentId === null || environmentId === undefined) {
            throw new ArgumentNullException('environmentId', 'sendInvitation');
        }
        if (invitationCreate === null || invitationCreate === undefined) {
            throw new ArgumentNullException('invitationCreate', 'sendInvitation');
        }
        
        let queryString = '';

        const requestUrl = '/environments/{environment_id}/invitations' + (queryString? `?${queryString}` : '');

        const response = await this.post <Invitation, InvitationCreate>(requestUrl.replace(`{${"environment_id"}}`, encodeURIComponent(String(environmentId))), invitationCreate);
        return new ApiResponse(response);
    }
}