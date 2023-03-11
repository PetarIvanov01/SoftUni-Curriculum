function calculator() {

    let num1 = undefined;
    let num2 = undefined;
    let result = undefined;

    return {
        init,
        add,
        subtract
    }

    function init(par1, par2, par3) {

        num1 = document.querySelector(`${par1}`);
        num2 = document.querySelector(`${par2}`);
        result = document.querySelector(`${par3}`);

    }
    function add() {

        result.value = Number(num1.value) + Number(num2.value);

    }
    function subtract() {

        result.value = Number(num1.value) - Number(num2.value);

    }
}
const calculate = calculator();
calculate.init('#num1', '#num2', '#result');





