## Classes

<dl>
<dt><a href="#CheckField">CheckField</a></dt>
<dd><p>The definition for a single field</p></dd>
<dt><a href="#CheckFieldCheck">CheckFieldCheck</a></dt>
<dd><p>Check a field that run a generic method with multiple arguments</p></dd>
<dt><a href="#CheckFieldExists">CheckFieldExists</a></dt>
<dd><p>The definition for a single field</p></dd>
<dt><a href="#CheckFieldItems">CheckFieldItems</a></dt>
<dd><p>Check a collection</p></dd>
<dt><a href="#CheckFieldType">CheckFieldType</a></dt>
<dd><p>Check the type of a field</p></dd>
<dt><a href="#Checks">Checks</a></dt>
<dd><p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p></dd>
<dt><a href="#FieldConfig">FieldConfig</a></dt>
<dd><p>Handle the config for a single field</p></dd>
</dl>

## Constants

<dl>
<dt><a href="#check_numbers">check_numbers</a></dt>
<dd><p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p></dd>
<dt><a href="#hex_re_str">hex_re_str</a></dt>
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

<a name="CheckField"></a>

## CheckField
<p>The definition for a single field</p>

**Kind**: global class  

* * *

<a name="CheckFieldCheck"></a>

## CheckFieldCheck
<p>Check a field that run a generic method with multiple arguments</p>

**Kind**: global class  

* * *

<a name="CheckFieldExists"></a>

## CheckFieldExists
<p>The definition for a single field</p>

**Kind**: global class  

* * *

<a name="CheckFieldItems"></a>

## CheckFieldItems
<p>Check a collection</p>

**Kind**: global class  

* * *

<a name="CheckFieldType"></a>

## CheckFieldType
<p>Check the type of a field</p>

**Kind**: global class  

* * *

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

<a name="FieldConfig"></a>

## FieldConfig
<p>Handle the config for a single field</p>

**Kind**: global class  

* [FieldConfig](#FieldConfig)
    * [.type](#FieldConfig+type)
    * [.type_test](#FieldConfig+type_test) : <code>function</code>
    * [.check_test](#FieldConfig+check_test) : <code>function</code>
    * [.required](#FieldConfig+required) : <code>Boolean</code>
    * [.label](#FieldConfig+label) : <code>String</code>
    * [.args](#FieldConfig+args) : <code>Array</code>
    * [.argument_names](#FieldConfig+argument_names) : <code>Array.&lt;String&gt;</code>
    * [.config_source](#FieldConfig+config_source) : <code>string</code>


* * *

<a name="FieldConfig+type"></a>

### fieldConfig.type
<p>The type of this check (from [Checks]</p>

**Kind**: instance property of [<code>FieldConfig</code>](#FieldConfig)  

* * *

<a name="FieldConfig+type_test"></a>

### fieldConfig.type_test : <code>function</code>
<p>The type test function for this check</p>

**Kind**: instance property of [<code>FieldConfig</code>](#FieldConfig)  

* * *

<a name="FieldConfig+check_test"></a>

### fieldConfig.check_test : <code>function</code>
<p>The check function for this check</p>

**Kind**: instance property of [<code>FieldConfig</code>](#FieldConfig)  

* * *

<a name="FieldConfig+required"></a>

### fieldConfig.required : <code>Boolean</code>
<p>Is this field required</p>

**Kind**: instance property of [<code>FieldConfig</code>](#FieldConfig)  

* * *

<a name="FieldConfig+label"></a>

### fieldConfig.label : <code>String</code>
<p>A human label for this field</p>

**Kind**: instance property of [<code>FieldConfig</code>](#FieldConfig)  

* * *

<a name="FieldConfig+args"></a>

### fieldConfig.args : <code>Array</code>
<p>Arguments to be passed onto the check function for this field
<code>checkFunction(value, ...args)</code></p>

**Kind**: instance property of [<code>FieldConfig</code>](#FieldConfig)  

* * *

<a name="FieldConfig+argument_names"></a>

### fieldConfig.argument_names : <code>Array.&lt;String&gt;</code>
<p>The checks configured argument names</p>

**Kind**: instance property of [<code>FieldConfig</code>](#FieldConfig)  

* * *

<a name="FieldConfig+config_source"></a>

### fieldConfig.config_source : <code>string</code>
<p>Pass in some config source info, normally an Error stack line from
Wherever <code>Check.generate</code> was originally called</p>

**Kind**: instance property of [<code>FieldConfig</code>](#FieldConfig)  

* * *

<a name="check_numbers"></a>

## check_numbers
<p>Contains the config for all the different validation tests
This is loaded as <code>validate_config</code> into the <code>Validate</code> class at require time. </p>
<p>A lot of the tests are based on <a href="https://lodash.com/docs/">lodash</a> methods.</p>

**Kind**: global constant  

* * *

<a name="hex_re_str"></a>

## hex_re_str
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

