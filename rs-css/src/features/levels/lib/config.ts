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
        doThis: "Select the small Stormtroopers",
        selector: "stormtrooper.small",
        helpTitle: "Combine the Class Selector",
        syntax: "A.className",
        help: 'You can combine the class selector with other selectors, like the type selector.',
        examples: [
            '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
            '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>'
        ],
        boardMarkup: `
    <stormtrooper></stormtrooper>
    <stormtrooper class="small"></stormtrooper>
    <vader class="small"></vader>
    <stormtrooper class="small"></stormtrooper>
    <leia></leia>
`
    },
    {
        doThis: "Select small Darth Vader on the Deathstar",
        selector: "deathstar vader.small",
        syntax: "Put your back into it!",
        helpTitle: "You can do it...",
        help: 'Combine what you learned in the last few levels to solve this one!',
        boardMarkup: `
    <deathstar>
        <vader></vader>
    </deathstar>
    <vader class="small"></vader>
    <deathstar>
        <vader class="small"></vader>
    </deathstar>
    <deathstar>
        <chewie class="small"></chewie>
    </deathstar>
    <deathstar>
        <luke class="small"></luke>
    </deathstar>
`
    },
    {
        doThis: "Select all Lukes and BB-8",
        selector: "luke,bb-8",
        selectorName: "Comma Combinator",
        helpTitle: "Combine, selectors, with... commas!",
        syntax: "A, B",
        help: 'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
        examples: [
            '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
            '<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements'
        ],
        boardMarkup: `
        <luke></luke>
        <luke></luke>
        <luke></luke>
        <vader></vader>
        <bb-8></bb-8>
        <bb-8></bb-8>    
`
    },
    {
        doThis: "Select all!",
        selector: "*",
        selectorName: "The Universal Selector",
        helpTitle: "You can select everything!",
        syntax: "*",
        help: 'You can select all elements with the universal selector! ',
        examples: [
            '<strong>p *</strong> selects any element inside all <tag>p</tag> elements.',
        ],
        boardMarkup: `
    <chewie></chewie>
    <leia></leia>
    <millenium-falcon></millenium-falcon>
    <vader></vader>
    <stormtrooper id="slug"></stormtrooper>
`
    },
    {
        doThis: "Select everybody on the Millenium-falcons",
        selector: "millenium-falcon *",
        syntax: "A&nbsp;&nbsp;*",
        helpTitle: "Combine the Universal Selector",
        help: 'This selects all elements inside of <strong>A</strong>.',
        examples: [
            '<strong>p *</strong> selects every element inside all <tag>p</tag> elements.',
            '<strong>ul.slug *</strong> selects every element inside all <tag>ul class="slug"</tag> elements.'
        ],
        boardMarkup: `
    <millenium-falcon>
        <leia></leia>
    </millenium-falcon>
    <millenium-falcon>
        <c3po></c3po>            
    </millenium-falcon>
    <millenium-falcon>
        <luke></luke>
    </millenium-falcon>
    <deathstar>
        <vader class="small"></vader>
    </deathstar>
    <deathstar>
        <stormtrooper class="small"></stormtrooper>
    </deathstar>
`
    },
];

export const MIN_LEVEL = 0;

// eslint-disable-next-line no-magic-numbers
export const MAX_LEVEL = levels.length - 1;
export const LEVEL_STEP = 1;
