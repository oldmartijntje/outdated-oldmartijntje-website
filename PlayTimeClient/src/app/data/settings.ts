export const EditorSettings: any = {
    "EditorPathing": [
        "Railroad",
        "404"
    ],
    "MaxLines": {
        "Cosnole": 50,
        "Output": 50
    }
}

export const Settings: any = {

}

export const PageCode: any = {
    "Editor": {
        "javascript": "function generateFibonacci(n) {\n  const fibonacciSequence = [];\n  \n  if (n >= 1) {\n    fibonacciSequence.push(0);\n  }\n  if (n >= 2) {\n    fibonacciSequence.push(1);\n  }\n\n  for (let i = 2; i < n; i++) {\n    const nextFibonacci = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];\n    fibonacciSequence.push(nextFibonacci);\n  }\n\n  return fibonacciSequence;\n}\n\n// Example: Generate the first 10 Fibonacci numbers\nconst fibonacciNumbers = generateFibonacci(20);\nconsole.log(fibonacciNumbers);\n\n",
        "MarjinScript": "for(5){\n    print('henk', 'loop1')\n}\nprint('henk', 'noloop1')\nprint('henk', 'noloop2')\nfor(3) {\n    print('ss', 'loop2')\n    setValues(1, 2, 3, 4)\n    for(3) {\n        print('ss', 'loop2 subloop')\n        setValues(1, 2, 3, 4)\n    }\n}\n'123abc'\n6\n//cheeseI\nnoCommand(1)\n\n"
    },
    "Railroad": {
        "javascript": "",
        "MarjinScript": 'showTypeButton("ExpCliff")\nshowTypeButton("ExpDessert")\nshowTypeButton("ExpForrest")\nshowTypeButton("ExpHiking")\nshowTypeButton("ExpLake")\nshowTypeButton("ExpRiver")\nshowTypeButton("Normal1")\nshowTypeButton("Normal2")\nshowRollAllButton()\nshowDiceRollButton()\nshowDiceDeleteButton()\nshowDiceImage()\nsynchroniseCodeToPage()\n\n'
    },
    "404": {
        "javascript": "",
        "MarjinScript": ""
    }
}