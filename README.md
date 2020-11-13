[![Build Status](https://travis-ci.org/igbopie/spherov2.js.svg?branch=master)](https://travis-ci.org/igbopie/spherov2.js)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5c57b5d2addf2ea48c34/test_coverage)](https://codeclimate.com/github/igbopie/spherov2.js/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5c57b5d2addf2ea48c34/maintainability)](https://codeclimate.com/github/igbopie/spherov2.js/maintainability)
# Sphero API V2

Work in progress. Some commands are functional but not ready for prime time.


### Examples

First run this:

```sh
git clone git@github.com:igbopie/spherov2.js.git
cd sphero2.js
yarn install
```

then:

#### Sphero Mini

* `yarn patrol-sm`: Will move in a square (for now).
* `yarn nimbus-sm`: Steelseries Nimbus + Sphero Mini
* `yarn cmd`: CMD interaction with Sphero Mini
* `yarn police`: Will turn on LED as police do.
* `yarn collision`: Will turn red when collision detected
* `yarn sensor`: Will turn on stream sensor data. TODO: Parse sensor data

#### Lightning McQueen

* `yarn nimbus-lm`: Steelseries Nimbus + Lightning McQueen

#### BB9E

* `yarn patrol-gb`: Will move in a square (for now).
