
1. [Docco style code documentation](/docco_docs/autoEdit2API.html)
2. [JSdoc style code documentation](/jsdoc_docs/index.html)

Note that for now the `index.html` nwjs starter page is left out of the automatically generated docs.

### Updating documentation with Docco 

Using [docco](http://jashkenas.github.io/docco/) for documentation inspired by [this](http://samwize.com/2014/01/31/the-best-documentation-generator-for-node/) blog post.
In conjunction with json doc.

install docco globally 

```
npm install docco -g
```

to re-generate documentation run from root of app     

```bash
npm run document_docco
```

this puts documentation in `/docs/docco_docs` folder.

#### Docco config 

The setup for this is done in `package.json` scripts where the folders/files to consider for documentations and destination folder(`-o`) are specified.

```json
"document_docco": "docco -o ./docs/docco_docs --title 'autoEdit 2 Documentation' ./*.js ./frontEnd/*.js ./frontEnd/date_now/*.js ./frontEnd/edl_composer/*.js ./frontEnd/srt/*.js ./frontEnd/js/*.js ./frontEnd/js/models/*.js ./frontEnd/js/views/*.js ./frontEnd/js/collections/*.js ./interactive_transcription_generator/*.js ./interactive_transcription_generator/**/*.js",
```

### Updating documentation with JSDoc 


install jsdoc locally 

```
npm install jsdoc -save
```

Edit config file as explain in [blog post](http://samwize.com/2014/01/31/the-best-documentation-generator-for-node/){:target="_blank"}

>This is because you need to edit the config file in the module at .`/node_modules/jsdoc/config.json`. And this part of the information is at [usejsdoc.org](http://usejsdoc.org/about-configuring-jsdoc.html).


to re-generate documentation run from root of app 

```
npm run document_jsdoc
```

#### Jsdoc config 

This executes the script in `package.json`, and places the documentation inside of `/docs/jsdoc_docs`.


```json
 "document_jsdoc": "./node_modules/.bin/jsdoc *.js  --destination ./docs/jsdoc_docs  ./*.js ./frontEnd/*.js ./frontEnd/date_now/*.js ./frontEnd/edl_composer/*.js ./frontEnd/srt/*.js ./frontEnd/js/*.js ./frontEnd/js/models/*.js ./frontEnd/js/views/*.js ./frontEnd/js/collections/*.js ./interactive_transcription_generator/*.js ./interactive_transcription_generator/**/*.js"
 ```

[see here for jsodc tags to use](https://github.com/voxmedia/411/wiki/Javascript-Style-and-Syntax-Guide#important-comments)

