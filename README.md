# Absctract Syntax Tree Interpreter

### Execute Expressions Directly

```sh
./eva -e '(var x 21) (print x)'
$21
```

```sh
# print 0 to 9
./eva -e '(for (var x 0) (< x 10) (++ x) (print x) )'
```

### Execute From File

```sh
./eva -f ../examples/Test.eva
$30
```

# Syntax

### Binary Expressions

```sh
# === Math
(+ 2 3)
(* 4 3)
(/ 10 2)
```

```sh
# === Comparison
(> 2 3)
(>= 4 3)
(< 10 2)
(<= 10 2)
```

### Variable Declaration

```sh
# (var <name> <value>)
# var x = 10;
(var x 10)

# var x = 10 + y;
(var x (+ 10 y))
```

### Assigment Expressions

```sh
# (set <name> <value>)
(set x 10)
(set y (* 2 5))
```

### Variable Access

```sh
# <name>
x
(square 2)
```

### Block expression

```sh
# (begin <sequence>)
(begin
    (var x 12)
    (print x)
)
```

### Lamda Functions

```sh
# (lamda <args> <body>)
(var sum (lambda (x y) (+ x y) ))
```

### Function Call

```sh
# (<function name> <args>)
(square 2)
((lambda (x y) (+ x y) ) 2 1)
```

### Function Declaration

```sh
# (def <name> <args> <body>)
(def factorial (x)
    (if (= x 1)
        1
        (* x (factorial (- x 1)))
    )
)
```
___
### Class Declaration

```sh
# (class <name> <parent> <body>)
(class Point null
    (body
        (def constructor (this)
            (begin 0)
        )
    )
)
```

### Class Instances

```sh
# (new <class> <args>)
# var p = new Point(1,2);
(var p (new Point 1 2))
```

### Modules

```sh
# (new <class> <args>)
# var p = new Point(1,2);
(var p (new Point 1 2))
```

## Branch Expressions
___
### If Expression

```sh
# (if <condition> <true> <false>)
(begin
    (var x 12)
    (print x)
)
```

### Switch Expression
```sh
# (switch 
#(<condition> <block>)
#(<condition> <block>)
#(else <block>)
#)
(var x 9)
(switch 
    ((= x 10) 100)
    ((> x 10) 200)
    (else 0)
)
```

### While Loop

```sh
# (while <condition> <block>)
(var counter 0)
(while (< counter 10)
    (set counter (+ counter 1))
)
```

### For Loop

```sh
#(for <inti> <condition> <modifier>
#<block>
#)
(var result 0)
(for (var x 10) (> x 0) (-- x)
    (begin
        (set result (+ result 1))  
    )
)
```

