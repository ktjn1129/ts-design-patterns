export {}

class Memento {
    private date: string = new Date().toLocaleString();

    protected constructor(protected memo: string) {}

    getMemo(): string {
        return this.memo;
    }

    getInfo(): string {
        return `${this.date} / (${this.memo})`;
    }
}

class Notepad extends Memento {
    constructor(memo: string) {
        super(memo);
    }

    addMemo(memo: string) {
        this.memo = memo;
    }

    save(): Memento {
        console.log("メモを保存しました");
        return new Memento(this.getMemo());
    }

    restore(memento: Memento) {
        this.addMemo(memento.getMemo());
    }
}

class Caretaker {
    constructor(
        private notepad: Notepad,
        private mementos: Memento[] = []
    ) {}

    buckup() {
        this.mementos.push(this.notepad.save());
    }

    undo() {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();
        this.notepad.restore(memento);
    }

    showHisotry() {
        this.mementos.forEach(memento => console.log(memento.getInfo()));
    }
}

function run() {
    const notepad = new Notepad("first memo");
    const caretaker = new Caretaker(notepad);
    caretaker.buckup();

    notepad.addMemo("second memo");
    caretaker.buckup();
    notepad.addMemo("third memo");
    caretaker.buckup();

    console.log(notepad.getMemo());
    caretaker.showHisotry();

    console.log("");
    caretaker.undo();
    console.log(notepad.getMemo());
    caretaker.undo();
    console.log(notepad.getMemo());
    caretaker.undo();
    console.log(notepad.getMemo());
    caretaker.undo();
    console.log(notepad.getMemo());

    caretaker.showHisotry();
}

run();