import {ManagedFunc} from 'aolie_core/src/blockui/ManagedFunc';
import {MenuInfo} from 'aolie_core/src/sysfunc/menu/dto/MenuInfo';
import {ManagedTable} from 'aolie_core/src/blockui/managedView/ManagedTable';
import {AutoManagedUI} from 'aolie_core/src/blockui/managedView/AutoManagedUI';
import {Alert} from 'aolie_core/src/uidesign/view/JQueryComponent/Alert';
import {Constants} from 'aolie_core/src/common/Constants';
import {MenuFunc} from 'aolie_core/src/decorator/decorator';
import {Dialog} from 'aolie_core/src/blockui/Dialog';
import {DeployService} from './service/DeployService';
import {EditorDlg} from './dialogs/EditorDlg';
import {CommonUtils} from 'aolie_core/src/common/CommonUtils';

@MenuFunc('DeployUI')
export class DeployUI extends ManagedFunc<MenuInfo> {
    /**
     * 部署列表
     */
    private table: ManagedTable;

    afterComponentAssemble(): void {
        super.afterComponentAssemble();
        this.addReadyListener(() => {
            this.table = <ManagedTable>this.findSubUIByType(ManagedTable);
            let inter = this.getDeployEventInterceptor();
            this.table.addEventInterceptor(Constants.DsOperatorType.custom1, inter);
            this.table.addEventInterceptor(Constants.DsOperatorType.custom2, inter);
        });

    }

    private getDeployEventInterceptor() {
        return {
            beforeHandle: (operType: number | string, dsId: number, data: object | Array<object>, ui: AutoManagedUI) => {
                if (operType == Constants.DsOperatorType.custom1) {

                    new EditorDlg({title: '编辑流程'}).show(data['model_id'], CommonUtils.getDialogFullSize());
                } else {
                    this.doDeploy(data);
                }
                return true;
            }
        }
    }

    private doDeploy(data) {
        Dialog.showConfirm('确定要重新部署工作流吗?', () => {
            DeployService.deployWf(data['wf_id'], (result) => {
                Alert.showMessage('部署完成 ')
                this.table.reload();
            })
        })
    }


}
