# budget-tracker

This app uses MongoDB to store transaction information. A service worker runs in the background and checks for an internet connection. If the network is disconnected it stores transactions in IndexedDB. When connectivity is restored the DB is synched back up with Mongo.

![Progressive loading budget tracker](https://github.com/GuyFromHere/budget-tracker/blob/master/public/screenshot.png)