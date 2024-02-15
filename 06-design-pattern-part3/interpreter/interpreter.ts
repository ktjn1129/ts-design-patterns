export {}

class Context {
    constructor(
        public expression: string,
        public date: Date,
    ) {
        this.validate(expression);
        this.expression = expression;
    }

    validate(expression: string) {
        if (expression.length != 10 || 
            !/^(?=.*YYYY)(?=.*MM)(?=.*DD)/.test(expression)
        ) {
            throw new Error("expressionが不正です");
        }
    }
}

interface AbstractExpression {
    interpret(context: Context);
}

class MonthExpression implements AbstractExpression {
    private child: AbstractExpression = null;

    setChild(child: AbstractExpression) {
        this.child = child;
    }

    interpret(context: Context) {
        const expression = context.expression;
        const month = context.date.getMonth() + 1;
        context.expression = expression.replace("MM", month.toString());

        if (this.child) {
            this.child.interpret(context);
        }
        return context;
    }
}

class DayExpression implements AbstractExpression {
    private child: AbstractExpression = null;

    setChild(child: AbstractExpression) {
        this.child = child;
    }

    interpret(context: Context) {
        const expression = context.expression;
        const day = context.date.getDate();
        context.expression = expression.replace("DD", day.toString());

        if (this.child) {
            this.child.interpret(context);
        }
        return context;
    }
}

class YearExpression implements AbstractExpression {
    private child: AbstractExpression = null;

    setChild(child: AbstractExpression) {
        this.child = child;
    }

    interpret(context: Context) {
        const expression = context.expression;
        const year = context.date.getFullYear();
        context.expression = expression.replace("YYYY", year.toString());

        if (this.child) {
            this.child.interpret(context);
        }
        return context;
    }
}

function run() {
    const now = new Date();
    const expression = "MM/DD/YYYY";

    const context = new Context(expression, now);
    const yearExpression = new YearExpression();
    const monthExpression = new MonthExpression();
    const dayExpression = new DayExpression();

    monthExpression.setChild(dayExpression);
    yearExpression.setChild(monthExpression);

    const result = yearExpression.interpret(context);
    console.log(now.toLocaleDateString());
    console.log(result.expression);
}

run();