# lesson-3

## Nock Recording - phases:

1. Record & save api call data:

```
nock.recorder.rec({}) // to start recording
// api call
const output = noc.recorder.play() // to play the recording and save it
```

2. Save output to a separate file

3. Prepare a mock call that will intercept any later http request with the right parameters
(the test will work offline!)

```
node.load(PATH) // PATH: leads to the file with saved recording
```

## Other skills you should have by now:

- generating types with the help of quicktype (but with code, not with the app)
- management of the file system via code (fs.mkdir, fs.writeFile, resolve/join to build paths)

## Other issues:

### How can we safely test decimals using Jest?

The ideal way would be to remove the comma [in some miraculous way, to be revealed later *suspense*]

The non-ideal but a lovely way is to multiply the numbers burderned with decimals by Math.pow(10, x)* to turn them into integers.

*x being the number of decimals.

### What are dependencies?

- libraries
- databases
- external APIs

### What's the difference between an interface and an object instance?

Interface is a contract declaring what the object should look like.
Btw: so there are libraries which generate sample data based on interfaces.

## Task:

Record two api calls with nock & write tests that use the saved "cassettes" (and therefore work online & don't consume your api call limits).
Then write an integration test that tests:
- the fetching function (2 calls)
- the function that calculates the difference (based on mock API responses)

------------------

### Zadanie 1
Dziś będziemy pisać aplikację giełdową wyświetlającą kursy walut :O
Nie używajcie do sprawdzania endpointów niczego poza kodem w testach.
API Docs Link: http://api.nbp.pl/
1. Odnajdźcie endpointy potrzebne do napisania aplikacji wyświetlającej aktualny kurs 2 różnych par walut EUR/PLN i USD/PLN
2. Rozpiszcie interfejsy dla tychże endpointów
3. Znajdźcie endpointy potrzebne do wyświetlenia zmiany pomiędzy aktualnym kursem, a kursem z przed tygodnia i miesiąca
4. Rozpiszcie interfejsy dla tychże endpointów
