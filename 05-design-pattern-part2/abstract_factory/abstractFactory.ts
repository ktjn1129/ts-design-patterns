export {}

interface Button {
    press();
}

interface Checkbox {
    switch();
}

interface GUIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
}

class WindowsButton implements Button {
    press() {
        console.log("Windows用のボタンが押されました");
    }
}

class WindowsCheckbox implements Checkbox {
    switch() {
        console.log("Windowsのチェックボックスが切り替えられました");
    }
}

class WindowsGUIFactory implements GUIFactory {
    createButton(): Button {
        return new WindowsButton();
    }
    createCheckbox(): Checkbox {
        return new WindowsCheckbox();
    }
}

class MacButton implements Button {
    press() {
        console.log("Mac用のボタンが押されました");
    }
}

class MacCheckbox implements Checkbox {
    switch() {
        console.log("Macのチェックボックスが切り替えられました");
    }
}

class MacGUIFactory implements GUIFactory {
    createButton(): Button {
        return new MacButton();
    }
    createCheckbox(): Checkbox {
        return new MacCheckbox();
    }
}

function run(factory: GUIFactory) {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
    button.press();
    checkbox.switch();
}

run(new WindowsGUIFactory());
run(new MacGUIFactory());