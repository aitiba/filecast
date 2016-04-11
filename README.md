# filecast

Cast files over sockets

Goes to http://localhost:3000/[channel] joins the browser with [channel] named channel.
Otherwise, if you go to http://localhost:3000/ joins the browser with 'anonimous'
named channel.

== Run ==

git clone xxx
cd fileRender
npm install
npm run-script build
npm start

== Build scripts==

create config, wiredep and inject js and css files:
    npm run-script build
