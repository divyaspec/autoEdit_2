## Documentation Intro

Can also explore the documentation as [Docco style code documentation](/docco_docs/autoEdit2API.html)

```bash
.
├── LICENCE.MD
├── README.md
├── appdmg.json
├── background.png
├── config.js
├── deploy.js
├── docs
│   └── ... jekyll sit for project page and documentation  
├── favicon.ico
├── frontEnd
│   ├── autoEdit2API.js
│   ├── date_now
│   ├── demo_jr.js
│   ├── edl_composer
│   ├── index.html
│   ├── js
│   ├── public
│   ├── srt
│   └── vendor
├── interactive_transcription_generator
│   ├── README.md
│   ├── bin
│   ├── gentle_stt_node
│   ├── index.js
│   ├── sam_transcriber
│   ├── video_metadata_reader
│   └── video_to_html5_webm
├── node_modules
├── nw.icns
├── nw_l.icns
├── package.json
├── red-button.png
├── spec
│   ├── autoEdit2API_spec.js
│   ├── gentle
│   ├── interactive_transcription_generator_spec.js
│   ├── sam_transcriber
│   ├── support
│   ├── test_interactive_transcription_generator.js
│   ├── test_video_to_html5_webm.js
│   ├── video_metadata_reader
│   └── video_to_html5_webm
└── wttskeys_dev.json

```


### `frontEnd`
```
├── frontEnd
│   ├── autoEdit2API.js
│   ├── date_now
│   ├── demo_jr.js
│   ├── edl_composer
│   ├── index.html
│   ├── js
│   ├── public
│   ├── srt
│   └── vendor
```

`autoEdit2API` overwrighting backbone.sync method and using node modules for backend for db using linvodb3, which uses level-js, which uses indexdb in chrome v8.


backbone front end . `demo_jr.js` is the code that runs the demo when index is runned in client side mode in the browser.

`js` contains the backbone project.


### `interactive_transcription_generator`
```
├── interactive_transcription_generator
│   ├── README.md
│   ├── bin
│   ├── gentle_stt_node
│   ├── index.js
│   ├── sam_transcriber
│   ├── video_metadata_reader
│   └── video_to_html5_webm
```


### `docs` 
[Project page, on github pages](https://opennewslabs.github.io/autoEdit_2/).
Jekyll website,  using 

- For landing page [pratt-app-landing-page](http://blacktie.co/2013/10/pratt-app-landing-page/) [demo](http://blacktie.co/demo/pratt)
- Other user manual and documentation pages [jekyll-docs-template](https://github.com/bruth/jekyll-docs-template) [demo](http://bruth.github.io/jekyll-docs-template)

-  `/docs/_posts` for user manual page and `/docs/_posts/tutorial` for  developer documentation.
- using jdoc and docco for automatic documentation generated 


### `deploy.js`

Deployment script. [more info on deploy/packaging of app in nwjs boilerplate project](lhttps://github.com/pietrop/nwjs_boilerplate#deploy)

### `cache` 
is a folder used by deploy to keep the latest version needed to build and package the app, to avoid having to re-download it every time


### `tmd_media` 
is where the wav files are kept, and the deleted, when sending split chunks to watson.

### `media`
 is where video webm previews and audio wav files for transcriptions are kept. 

### `wttskeys.json` 
At root level is where watson API keys are ketp, this file is in `.gitignore` to avoid accidentally pushing it to github. When you first clone the project, this file shoudl not be there. 

See [user manual to see how user ir prompted to add IBM keys on startup](https://opennewslabs.github.io/autoEdit_2/user_manual/setup.html#add-the-api-keys-to-the-app-at-startup)

### `spec`
Test suite 