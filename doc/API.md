## Classes

<dl>
<dt><a href="#Checks">Checks</a></dt>
<dd><p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p></dd>
</dl>

## Constants

<dl>
<dt><a href="#check_numbers">check_numbers</a></dt>
<dd><p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p></dd>
<dt><a href="#check_strings">check_strings</a></dt>
<dd><p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p></dd>
<dt><a href="#check_things">check_things</a></dt>
<dd><p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p></dd>
<dt><a href="#check_types">check_types</a></dt>
<dd><p>Contains all the lodash checksm and a couple more</p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p></dd>
</dl>

<a name="Checks"></a>

## Checks
<p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p>

**Kind**: global class  

* * *

<a name="Checks.compileObjectTemplate"></a>

### Checks.compileObjectTemplate(str, options) ⇒ <code>function</code>
<p>If you have a common template string that is replaced a
lot, compile it first to remove some of the repeated string
processing.</p>

**Kind**: static method of [<code>Checks</code>](#Checks)  
**Returns**: <code>function</code> - <p>Templating function</p>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>Template string to compile <code>a {{param}} replacer</code></p> |
| options | <code>object</code> | <p>Options</p> |
| options.re | <code>RegExp</code> | <p>Regular Expression for the param tags to be replaced</p> |


* * *

<a name="check_numbers"></a>

## check_numbers
<p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p>

**Kind**: global constant  

* * *

<a name="check_strings"></a>

## check_strings
<p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p>

**Kind**: global constant  

* * *

<a name="check_things"></a>

## check_things
<p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p>

**Kind**: global constant  

* * *

<a name="check_types"></a>

## check_types
<p>Contains all the lodash checksm and a couple more</p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p>

**Kind**: global constant  

* * *

