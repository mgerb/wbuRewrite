# Where Bar You - React Native App

This is an app I worked on to learn React Native app development.
It is no longer being maintained.

[Check out a blog post I did here.](https://mitchellgerber.com/post/Projects/2017-11-18-my-first-app)


## Problems to remember...


> [] __nw_connection_get_connected_socket_block_invoke 46 Connection has no connected handler

```
1. Xcode menu -> Product -> Edit Scheme...
2. Environment Variables -> Add -> Name: "OS_ACTIVITY_MODE", Value:"disable"
3. Run your app again, done! 😄
```

### Debug menu problems

Adding react as a dependency to the pod file causes the debuge menu to not work ona device (shake gesture).
I can install the pods and then comment out these lines - install again and it works for now

### 0.43.2

Not upgrading yet because it breaks the inverted scrollview


### Linker error
- Select React scheme and rebuild project
- watchman watch-del-all
- yarn start --reset-cache
- remove libReact.a from build phases and readd it

## Deploy to production
- product > scheme > release
- product > build
- product > archive
- upload build
