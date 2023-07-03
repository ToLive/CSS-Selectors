import { Level } from "../types";

export const levels: Level[] = [
    {
        doThis: "Select the Darth Vader",
        selector: "vader",
        syntax: "A",
        helpTitle: "Select elements by their type",
        selectorName: "Type Selector",
        help: "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
        examples: [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: `
    <deathstar></deathstar>
    <vader></vader>
    <deathstar></deathstar>
`
    },
    {
        doThis: "Select the Darth Vader with brain slug",
        selector: "#slug",
        selectorName: "ID Selector",
        helpTitle: "Select elements with an ID",
        syntax: "#id",
        help: 'Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.',
        examples: [
            '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
            '<strong>ul#long</strong> selects <tag>ul id="long"</tag>'
        ],
        boardMarkup: `
    <vader id="slug"></vader>
    <vader></vader>
    <deathstar></deathstar>
`
    },
    {
        selectorName: "Descendant Selector",
        doThis: "Select the Darth Vader on the Death star",
        selector: "deathstar vader",
        helpTitle: "Select an element inside another element",
        syntax: "A&nbsp;&nbsp;B",
        help: "Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.",
        examples: [
            '<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
            '<strong>#slug&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="slug"</strong>',
        ],
        boardMarkup: `
    <chewie></chewie>
    <deathstar>
        <vader></vader>
    </deathstar>
    <chewie></chewie>
`
    },
    {
        doThis: "Select the Princess Leia in the rebel Millenium Falcon",
        selector: "#rebel leia",
        helpTitle: "Combine the Descendant & ID Selectors",
        syntax: "#id&nbsp;&nbsp;A",
        help: 'You can combine any selector with the descendent selector.',
        examples: [
            '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>'
        ],
        boardMarkup: `
    <millenium-falcon>
        <vader></vader>
    </millenium-falcon>
    <deathstar>
        <vader></vader>        
    </deathstar>
    <millenium-falcon id="rebel">
        <leia></leia>
    </millenium-falcon>
`
    },
    {
        doThis: "Select red Lightsaber",
        selector: ".red",
        selectorName: "Class Selector",
        helpTitle: "Select elements by their class",
        syntax: ".classname",
        help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
        examples: [
            '<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>'
        ],
        boardMarkup: `    
    <vader>
        <lightsaber class="red"></lightsaber>
    </vader>
    <luke>
        <lightsaber></lightsaber>
    </luke>
`
    },
    {
        doThis: "Select the small oranges",
        selector: "orange.small",
        helpTitle: "Combine the Class Selector",
        syntax: "A.className",
        help: 'You can combine the class selector with other selectors, like the type selector.',
        examples: [
            '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
            '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>'
        ],
        boardMarkup: `
    <apple></apple>
    <apple class="small"></apple>
    <deathstar>
        <orange class="small"></orange>
    </deathstar>
    <vader>
        <orange></orange>
    </vader>
    <vader>
        <orange class="small"></orange>
    </vader>
`
    },
    {
        doThis: "Select the small oranges in the deathstars",
        selector: "deathstar orange.small",
        syntax: "Put your back into it!",
        helpTitle: "You can do it...",
        help: 'Combine what you learned in the last few levels to solve this one!',
        boardMarkup: `
    <deathstar>
        <orange></orange>
    </deathstar>
    <orange class="small"></orange>
    <deathstar>
        <orange class="small"></orange>
    </deathstar>
    <deathstar>
        <apple class="small"></apple>
    </deathstar>
    <deathstar>
        <orange class="small"></orange>
    </deathstar>
`
    },
    {
        doThis: "Select all the vaders and deathstars",
        selector: "vader,deathstar",
        selectorName: "Comma Combinator",
        helpTitle: "Combine, selectors, with... commas!",
        syntax: "A, B",
        help: 'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
        examples: [
            '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
            '<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements'
        ],
        boardMarkup: `
    <lightsaber class="small"></lightsaber>
    <lightsaber></lightsaber>
    <vader>
        <lightsaber></lightsaber>
    </vader>
    <deathstar>
        <lightsaber></lightsaber>
    </deathstar>
    <vader>
        <lightsaber></lightsaber>
    </vader>
    <lightsaber></lightsaber>
    <lightsaber class="small"></lightsaber>
`
    },
    {
        doThis: "Select all the things!",
        selector: "*",
        selectorName: "The Universal Selector",
        helpTitle: "You can select everything!",
        syntax: "*",
        help: 'You can select all elements with the universal selector! ',
        examples: [
            '<strong>p *</strong> selects any element inside all <tag>p</tag> elements.',
        ],
        boardMarkup: `
    <apple></apple>
    <vader>
        <orange class="small"></orange>
    </vader>
    <deathstar></deathstar>
    <deathstar>
        <orange></orange>
    </deathstar>
    <vader id="slug"></vader>
`
    },
    {
        doThis: "Select everything on a vader",
        selector: "vader *",
        syntax: "A&nbsp;&nbsp;*",
        helpTitle: "Combine the Universal Selector",
        help: 'This selects all elements inside of <strong>A</strong>.',
        examples: [
            '<strong>p *</strong> selects every element inside all <tag>p</tag> elements.',
            '<strong>ul.slug *</strong> selects every element inside all <tag>ul class="slug"</tag> elements.'
        ],
        boardMarkup: `
    <vader id="slug">
        <orange class="small"></orange>
    </vader>
    <vader>
        <lightsaber></lightsaber>
    </vader>
    <apple class="small"></apple>
    <vader>
        <apple></apple>
    </vader>
`
    },
    {
        doThis: "Select every apple that's next to a vader",
        selector: "vader + apple",
        helpTitle: "Select an element that directly follows another element",
        selectorName: "Adjacent Sibling Selector",
        syntax: "A + B",
        help: "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
        examples: [
            '<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',
            '<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>'
        ],
        boardMarkup: `
    <deathstar>
        <apple class="small"></apple>
    </deathstar>
    <vader></vader>
    <apple class="small"></apple>
    <vader></vader>
    <apple></apple>
    <apple class="small"></apple>
    <apple class="small"></apple>
`
    },
    {
        selectorName: "General Sibling Selector",
        helpTitle: "Select elements that follows another element",
        syntax: "A ~ B",
        doThis: "Select the lightsabers beside the deathstar",
        selector: "deathstar ~ lightsaber",
        help: "You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.",
        examples: [
            '<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>'
        ],
        boardMarkup: `
    <lightsaber></lightsaber>
    <deathstar>
        <orange class="small"></orange>
    </deathstar>
    <lightsaber class="small"></lightsaber>
    <lightsaber></lightsaber>
    <vader>
        <lightsaber></lightsaber>
    </vader>
    <vader>
        <lightsaber class="small"></lightsaber>
    </vader>
`
    },
];

export const MIN_LEVEL = 0;

// eslint-disable-next-line no-magic-numbers
export const MAX_LEVEL = levels.length - 1;
export const LEVEL_STEP = 1;
