// react-native-root-toast looks to be no longer maintained
// this class is temporary until I implement toasts myself
import t from 'react-native-root-toast';

class toast {
    private toast: any;

    public success(message: string): void {
        this.hide();
        this.toast = t.show(message, {
            position: 150,
        });
    }

    public error(message: string): void {
        this.hide();
        this.toast = t.show(message, {
            position: 150,
        });
    }

    public hide(): void {
        if (this.toast) {
            t.hide(this.toast);
        }
    }
}

export default new toast();
