# eva-ast-interpreter

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
./eva -f ../examples/Test.eva
