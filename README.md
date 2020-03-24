# [![Tutorbook Logo](https://tutorbook.app/favicon/text-logo.png)](https://tutorbook.app)

The Google Chrome peer tutoring appointment timer extension that enables peer
tutors to record their online/virtual peer tutoring sessions (for review by
their peer tutoring supervisor) on [Tutorbook](https://tutorbook.app).

For more information, head over to our [official
documentation](https://tutorbook.app/docs) or our [web app's
repository](https://github.com/tutorbookapp/tutorbook).

## Developing

First, clone and `cd` into this GitHub repository by running:

```bash
$ git clone https://github.com/tutorbookapp/chrome-tutorbook
$ cd chrome-tutorbook/
```

Then, install our dependencies via [`npm`](https://npmjs.com):

```bash
$ npm i
```

Finally, to [webpack](https://webpack.js.org) our `src/` files into an
installable Chrome extension, run:

```bash
$ npm run pack
```
