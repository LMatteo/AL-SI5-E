# BlaBlaMove

## How to build/run everything

### Build

``` 
cd ./sources
mvn clean install
```

### Run project

#### run server
``` 
cd ./sources/dist
mvn tomee:run
```
#### run charge tests
```
cd ./tests
mvn clean install
```

or 
```
cd ./tests
mvn clean package
mvn gatling:execute
```

### Repartition 

#### Path service

Shiyang Huang 

#### Contract Registry 

Lucas Matteo

#### Contract Instance

Mohamed Chennouf

#### Agence Notifier

François Melkonian 
