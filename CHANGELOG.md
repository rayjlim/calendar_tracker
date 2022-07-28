# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.1.1](https://github.com/rayjlim/calendar_tracker/compare/v4.1.0...v4.1.1) (2022-07-28)

## [4.0.0](https://github.com/rayjlim/calendar_tracker/compare/v3.1.0...v4.0.0) (2022-07-27)


### ⚠ BREAKING CHANGES

* ⬆️ upgrade to react 17

### Features

* ⬆️ upgrade to react 17 ([2a87143](https://github.com/rayjlim/calendar_tracker/commit/2a8714337d800c39515264ec50f58dfb696d094b))


### Bug Fixes

* ♻️ refactor out TODOs into github tasks ([99d170b](https://github.com/rayjlim/calendar_tracker/commit/99d170bfd80deb7b6fefe4c4c823a195e6073dca))
* 🐛 add in error handlers for safari error ([2163cdf](https://github.com/rayjlim/calendar_tracker/commit/2163cdf45dbb0de718f986dd464761d0970f500c))
* 🔒️ gpg encrypt secrets ([02688bb](https://github.com/rayjlim/calendar_tracker/commit/02688bbea13152b14c3e2ee1294830d734685401))
* 🔒️ remove config backup script ([eebe84b](https://github.com/rayjlim/calendar_tracker/commit/eebe84bda16c7573b652272ed2e80ca244d2e490))
* 🚑 disable service worker because causing safari error ([42afc45](https://github.com/rayjlim/calendar_tracker/commit/42afc458f80b59564ba336542113e8525069e551))

## [3.1.0](https://github.com/rayjlim/calendar_tracker/compare/v3.0.1...v3.1.0) (2022-02-22)


### Features

* ✨ [#32](https://github.com/rayjlim/calendar_tracker/issues/32) date picker for input, improve state mgmt ([65bb1aa](https://github.com/rayjlim/calendar_tracker/commit/65bb1aae8d621477581066211c7f2f93ed4bd7d8))
* 🔒️ basic service worker to get PWA setup [#56](https://github.com/rayjlim/calendar_tracker/issues/56) ([0e7852b](https://github.com/rayjlim/calendar_tracker/commit/0e7852b78f12bd0801934ae3a71f4a21343ccff2))


### Bug Fixes

* ♻️ make year list dynamic, optimize state usage in Aggregate Section ([aef1a9e](https://github.com/rayjlim/calendar_tracker/commit/aef1a9ed9ffd37dd9708f935d9c679f6a88c1cdd))
* 📝 update readme ([e3bb888](https://github.com/rayjlim/calendar_tracker/commit/e3bb88818700cbbf0cdd344863779dd6dc4c2dc7))
* 🔧 add htaccess to redirect to tracks.lilplaytime.com ([ff2625f](https://github.com/rayjlim/calendar_tracker/commit/ff2625f67aab67cf4329a80831bfbfe1424f5bdb))
* 🔧 backup scripts and .htaccess ([25a8712](https://github.com/rayjlim/calendar_tracker/commit/25a87129cc7106c922fba05f41bc421f9217be43))
* 🚑  migrate over cron email report ([05a545a](https://github.com/rayjlim/calendar_tracker/commit/05a545ab4e2cf42f3ed3bbe6463381c4e4f3a587))
* 🚧 SERVER check for HTTP_ORIGIN issue ([c804b95](https://github.com/rayjlim/calendar_tracker/commit/c804b95d0b82ac5efb497a6a9877160c96bef905))

### [3.0.1](https://github.com/rayjlim/calendar_tracker/compare/v3.0.0...v3.0.1) (2022-02-15)


### Bug Fixes

* 🎨 gitignore for htaccess, del localhost ref ([7d28aaa](https://github.com/rayjlim/calendar_tracker/commit/7d28aaa6a83e00ac3138322ca528b2f7345ba0d6))

## [3.0.0](https://github.com/rayjlim/calendar_tracker/compare/v2.1.5...v3.0.0) (2022-02-13)


### ⚠ BREAKING CHANGES

* 🏗️ upgrade slim4 - lumen, folder structure

### Features

* ♻️ completed scripts upgrade for folders ([10f4cd2](https://github.com/rayjlim/calendar_tracker/commit/10f4cd22f77b338d5bf61a893c31755b3ad117bf))
* ➕  change slim4 for lumen ([e70d436](https://github.com/rayjlim/calendar_tracker/commit/e70d4366134b7b118ab921842ed9485d4bc1a5ae))
* 🎉 folder restructure ([f9251dc](https://github.com/rayjlim/calendar_tracker/commit/f9251dcc7576b0bdb973c8d85be7265d13060362))
* 🏗️ upgrade slim4 - lumen, folder structure ([6dfa38d](https://github.com/rayjlim/calendar_tracker/commit/6dfa38db367633aceffd65b00a2abc28dcc6c2b3))
* 🔥 clean up root files ([662ed7b](https://github.com/rayjlim/calendar_tracker/commit/662ed7ba1cefd5ae43572fb4f8d337f835cebfa5))


### Bug Fixes

* 🐛 routing for metrics controller CORS issue ([5532233](https://github.com/rayjlim/calendar_tracker/commit/5532233cfc5d41516d84631ce0b05113bc9e78f6))
* 🚀 deploy scripts remove unneccesary ([0d745c9](https://github.com/rayjlim/calendar_tracker/commit/0d745c92b52ffb4886a47002373a513c73c2ca5a))
* 🚨 implement add/delete in lumen ([5c8181b](https://github.com/rayjlim/calendar_tracker/commit/5c8181b3677a608c6ae2af073a319fc07140f96e))

### [2.1.5](https://github.com/rayjlim/calendar_tracker/compare/v2.1.4...v2.1.5) (2022-02-13)

### [2.1.4](https://github.com/rayjlim/calendar_tracker/compare/v2.1.3...v2.1.4) (2020-10-21)


### Bug Fixes

* 🐛 Cron report working again ([aa4a6e0](https://github.com/rayjlim/calendar_tracker/commit/aa4a6e0040ecd62ce7343c4477fb9bef066390d0))

### [2.1.3](https://github.com/rayjlim/calendar_tracker/compare/v2.1.2...v2.1.3) (2020-10-14)


### Bug Fixes

* 🎨 code clean up ([3ddb6e3](https://github.com/rayjlim/calendar_tracker/commit/3ddb6e34bc14759f925d5e80f33c2ea148d56ce1))

### [2.1.2](https://github.com/rayjlim/calendar_tracker/compare/v2.1.1...v2.1.2) (2020-09-30)


### Bug Fixes

* ♻️ migrate to date-fns; from moment ([6b82db5](https://github.com/rayjlim/calendar_tracker/commit/6b82db5a6d85bbd67e552e1f9bdc93f0e21994d8))

### [2.1.1](https://github.com/rayjlim/calendar_tracker/compare/v2.1.0...v2.1.1) (2020-09-20)


### Bug Fixes

* 🐛 anti-pattern of assigning props to state ([9a1f0be](https://github.com/rayjlim/calendar_tracker/commit/9a1f0bef46ed2e88aca0740faca5471f6ab894fe))
* 🐛 bad pattern of set props to state; moved record-form to components ([ea84b9b](https://github.com/rayjlim/calendar_tracker/commit/ea84b9bff21258da2ffdeeaf01313985659fa989))

## [2.1.0](https://github.com/rayjlim/calendar_tracker/compare/v2.0.0...v2.1.0) (2020-09-08)


### Features

* ✨ ability to create record ([361b4d0](https://github.com/rayjlim/calendar_tracker/commit/361b4d0e8c062ca5721ea6bc8a1ccc647bdea95d))
* ✨ add buttons for incrementing count value ([cfb9dad](https://github.com/rayjlim/calendar_tracker/commit/cfb9dadd5b6dab240a2c74206cf5d8067a78e13d))
* ✨ chartjs ([283bfe9](https://github.com/rayjlim/calendar_tracker/commit/283bfe95513d45e44405f6a0488c381ffda119f1))
* ✨ hover / tooltip for both line graphs ([ddb676e](https://github.com/rayjlim/calendar_tracker/commit/ddb676e1499a435f34da5117021155369c22fbaa))
* ✨ production ui and backend working ([96146ed](https://github.com/rayjlim/calendar_tracker/commit/96146ed5f401ff51bfab9d412f40737c07e8c2b2))
* ✨ show metrics ([20d0c49](https://github.com/rayjlim/calendar_tracker/commit/20d0c4925211b42b7414748a5a747de766c5bb73))
* ✨ show monthly and yearly graph ([b8dd905](https://github.com/rayjlim/calendar_tracker/commit/b8dd9058a8c9c8e29fa90fa981fb9d8720ce0663))
* ✨ trend data ([9f03256](https://github.com/rayjlim/calendar_tracker/commit/9f03256cb3266b0ecf3336d4ee12c1b10e85b34e))
* 💄 show graph of past 2 months data ([ce77db4](https://github.com/rayjlim/calendar_tracker/commit/ce77db41faed82743c126c9f6e867ac0cca2a5c9))
* 🗃 add in redbean ([1b57a80](https://github.com/rayjlim/calendar_tracker/commit/1b57a80f60729d4b46a4c9bde1bea6ca5a2b6629))
* 🗃 backend for getting date range ([6a11654](https://github.com/rayjlim/calendar_tracker/commit/6a11654f3c2309f2afc39d3e7c01f0438fb98ddd))


### Bug Fixes

* 🚑 routes not recognized without name ([c958a27](https://github.com/rayjlim/calendar_tracker/commit/c958a2799ad552b2802be501d2d268c0d5f850e1))
* 🚨 php lint errors ([650ab0f](https://github.com/rayjlim/calendar_tracker/commit/650ab0f6df80d34a5fa9ae110f91ccbd284404c8))

## [2.0.0](https://github.com/rayjlim/calendar_tracker/compare/v1.1.0...v2.0.0) (2020-05-22)


### ⚠ BREAKING CHANGES

* :green_heart: phpmd fixes

### Features

* :green_heart: phpmd fixes ([5738064](https://github.com/rayjlim/calendar_tracker/commit/5738064e1327183bd59fd1355bec512697fb8593))

## 1.1.0 (2020-05-22)


### Features

* :bookmark: problem with standard-version ([183a2fe](https://github.com/rayjlim/calendar_tracker/commit/183a2fe01c74f7a7d1936ffad9e6c76f75a539de))


### Bug Fixes

* :bug: add scripts to composer ([9bde158](https://github.com/rayjlim/calendar_tracker/commit/9bde158e54562bb8db5b89b6b69da1890d9fb031))
* :bug: remove debug ([603f297](https://github.com/rayjlim/calendar_tracker/commit/603f29760ed0b48c737d34c078b4b87a5b88bd88))
* :rotating_light: phpcs psr2 ([070e6f2](https://github.com/rayjlim/calendar_tracker/commit/070e6f272314627f0b80f4f7dc995c2b4d224d62))
* :rotating_light: phpcs psr2 ([7818f24](https://github.com/rayjlim/calendar_tracker/commit/7818f24078590ba35afc4ccdb804b4cfbe94caee))

### 1.0.1 (2020-05-22)


### Bug Fixes

* :bug: add scripts to composer ([9bde158](https://github.com/rayjlim/calendar_tracker/commit/9bde158e54562bb8db5b89b6b69da1890d9fb031))
* :rotating_light: phpcs psr2 ([070e6f2](https://github.com/rayjlim/calendar_tracker/commit/070e6f272314627f0b80f4f7dc995c2b4d224d62))
* :rotating_light: phpcs psr2 ([7818f24](https://github.com/rayjlim/calendar_tracker/commit/7818f24078590ba35afc4ccdb804b4cfbe94caee))

### 1.0.1 (2020-05-22)


### Bug Fixes

* :bug: add scripts to composer ([9bde158](https://github.com/rayjlim/calendar_tracker/commit/9bde158e54562bb8db5b89b6b69da1890d9fb031))
* :rotating_light: phpcs psr2 ([070e6f2](https://github.com/rayjlim/calendar_tracker/commit/070e6f272314627f0b80f4f7dc995c2b4d224d62))
* :rotating_light: phpcs psr2 ([7818f24](https://github.com/rayjlim/calendar_tracker/commit/7818f24078590ba35afc4ccdb804b4cfbe94caee))
