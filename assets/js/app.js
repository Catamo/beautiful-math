/*
Story by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
  var $calculatorInput = $("#calculator"),
  $pastOperations = $("#pastOperations");

  var currentText = "",
  text = "";

  $(".number").click(function () {
    currentText = $(this).text();

    text += currentText;

    $calculatorInput.val(text);

    $pastOperations.text(calculateResult($calculatorInput.val()));
  });

  $(".operation").click(function () {
    operation = $(this).text();

    var tt = $calculatorInput.val();

    if (operation === "DEL") {
      text = text.slice(0, -1);
      $calculatorInput.val(text);
      $pastOperations.text(calculateResult($calculatorInput.val()));
      return;
    }
    else if (operation === "=") {
      $pastOperations.text("");
      text = calculateResult($calculatorInput.val());
    }
    else if (operation === "C") {
      text = "";
      $pastOperations.text("");
    }
    else if ($calculatorInput.val() === "" && operation != '-') {
      return;
    }
    else {
      if (/[\+\×\-\÷]/.test(text.slice(-1))){
        text = text.slice(0, -1);
      }

      text += operation;
    }

    $calculatorInput.val(text);
  });

  function calculateResult(strCalculator) {

    var arrCalculate = strCalculator
                          .replace(/-(?!\d)/g, "")
                          .replace(/(\d(?=-\d))/g, "$1\+")
                          .split(/[\+\×\÷](?!(\())/)
                          .filter(str => (str && str != '')),
        strOperations = strCalculator
                          .replace(/-(?!\d)/g, "")
                          .replace(/(\d(?=-\d))/g, "$1\+")
                          .replace(/([^\+\×\÷](?!(\()))/g, ''),
        calculatorIndex = 0,
        localValOne = 0,
        localValTwo = 0,
        localTotal = 0,
        localOperation = "";
        // localPrecision = 0;

    if (arrCalculate.length == 1) return arrCalculate[0];

    for (calculatorIndex = 0; calculatorIndex < arrCalculate.length; calculatorIndex++) {

      if (arrCalculate[calculatorIndex + 1]) {
        localValOne = Number(calculatorIndex === 0 ? arrCalculate[calculatorIndex] : localTotal);
        localValTwo = Number(arrCalculate[calculatorIndex + 1]);
        localOperation = strOperations[calculatorIndex];
        // localPrecision = getPrecision(localValOne) + getPrecision(localValTwo) + 1;

        switch (localOperation) {
          case "+":  localTotal = localValOne + localValTwo; break;
          case "-":  localTotal = localValOne - localValTwo; break;
          case "×":  localTotal = localValOne * localValTwo; break;
          case "÷":  localTotal = localValOne / localValTwo; break;
        }
      }
    }

    return localTotal !== 0 ? localTotal.toString() : "0";
  }

  //based in: http://stackoverflow.com/a/27865285
  function getPrecision(aNum) {
    if (!Number.isFinite(aNum)) return 0;
    var e = 1;
    while (Math.round(aNum * e) / e !== aNum) e *= 10;
    return Math.log10(e);
  }

})(jQuery);
