import {CommonUtils} from "aolie_core/src/common/CommonUtils";
import {NetRequest} from "aolie_core/src/common/NetRequest";
import {FlowInfo} from "../dto/FlowInfo";
import {BeanFactory} from "aolie_core/src/decorator/decorator";
import {WfTable2flowDto} from "../dto/WfTable2flowDto";

export class DeployService {
    private static URL_ROOT = "/wf";

    /**
     * 流程部署
     * @param wfId
     * @param callback
     */
    static deployWf(wfId, callback: (data) => void) {
        CommonUtils.handleResponse(
            NetRequest.axios.get(this.URL_ROOT + "/deploy/" + wfId), callback);
    }

    static getFlowInfoByVersion(callback: (data: Array<FlowInfo>) => void) {
        CommonUtils.handleResponse(
            NetRequest.axios.get(this.URL_ROOT + "/getFlowInfoByVersion"), (result) => {
                callback(BeanFactory.populateBeans(FlowInfo, result.data));
            });
    };

    static findTable2FlowByVersion(callback: (data: Array<WfTable2flowDto>) => void) {
        CommonUtils.handleResponse(
            NetRequest.axios.get(this.URL_ROOT + "/findTable2FlowByVersion"), (result) => {
                callback(BeanFactory.populateBeans(WfTable2flowDto, result.data));
            });
    }

    static commit(dsId, bussId, row, callback: (data) => void, onErr?: (message) => void) {
        CommonUtils.handleResponse(
            NetRequest.axios.post(this.URL_ROOT + "/commit/" + dsId + "/" + bussId, row),
            (result) => {
                callback(result.data);
            }, onErr);
    }

    static rollBack(dsId, bussId, callback: (data) => void, onErr?: (message) => void) {
        CommonUtils.handleResponse(
            NetRequest.axios.put(this.URL_ROOT + "/rollBack/" + dsId + "/" + bussId),
            (result) => {
                callback(result.data);
            }, onErr);
    }
}
