Angular module for creating or manipulating modals. It uses `semantic-ui` HTML markup, but otherwise is basically exactly like `github.com/Pathgather/popeye`.

Let's use this style guide: https://github.com/johnpapa/angular-styleguide/tree/master/a1

## Development

1. Clone this repository.
2. Run `npm install`.
3. Run `npm run docs` to build the documentation.
4. Run `gulp serve` to serve the documentation.
5. Run `gulp watch` to watch stuff and develop more easily.

## Dimmer

* complete documentation

## Modal

### TODO

* make `show()` return a Promise that resolves the moment the modal is closed and has details on whether it was closed, approved or denied
* make `hide()` return a Promise that resolves when the modal has finished animating out, and is rejected if the modal is not a `closable` modal
* make `approve()` and `deny()`
* make Promises available for when the modal becomes visible or hidden, etc.
* more tests
* try out practical scenario with a form in a modal
* DOM settings
* close/approve/deny buttons
* complete documentation
