import {Dialog, DialogInfo} from 'aolie_core/src/blockui/Dialog';
import {CommonUtils} from 'aolie_core/src/common/CommonUtils';

export class EditorDlg extends Dialog<DialogInfo> {
    protected getBody(): HTMLElement {
        return $(require("../templates/EditorDlg.html")).get(0);
    }

    protected afterShow() {
        this.setOkButtonVisible(false);
    }

    protected beforeShow(value?: any) {
        this.$element.find("iframe")
            .attr("src", CommonUtils.getConfigParam("flowableJUIRoot")
                + "/#/editor/" + value);
    }

}
