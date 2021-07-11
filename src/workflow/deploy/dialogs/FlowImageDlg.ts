import {Dialog, DialogInfo} from 'aolie_core/src/blockui/Dialog';
import {Alert} from 'aolie_core/src/uidesign/view/JQueryComponent/Alert';
import {CommonUtils} from 'aolie_core/src/common/CommonUtils';

export class FlowImageDlg extends Dialog<DialogInfo> {
    protected getBody(): HTMLElement {
        return $(require('../templates/FlowImageDlg.html')).get(0);
    }

    protected afterShow() {
        this.setOkButtonVisible(false);
    }

    protected beforeShow(value?: any) {
        this.$element.find('img')
            .attr('src', CommonUtils.getConfigParam('flowableJUIRoot') + '/wf/getFlowImage/'
                + value['tableId'] + '/' + value['bussId']);
    }

}
