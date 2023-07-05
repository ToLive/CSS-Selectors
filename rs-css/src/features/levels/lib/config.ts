import { Level } from "../types";

export const levels: Level[] = [
    {
        doThis: "Select the Darth Vader",
        selector: "vader",
        syntax: "A",
        helpTitle: "Select elements by their type",
        selectorName: "Type Selector",
        help: "Selects all elements of type <strong>A</strong>. Type refers to the type of tag.",
        examples: [
            '<strong>luke</strong> selects all <tag>luke</tag> elements.',
            '<strong>windu</strong> selects all <tag>windu</tag> elements.',
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
        help: 'Selects the element with a specific <strong>id</strong>.',
        examples: [
            '<strong>#red</strong> selects any element with <strong>id="red"</strong>',
            '<strong>vader#evil</strong> selects <tag>vader id="evil"</tag>'
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
        syntax: "A B",
        help: "Selects all <strong>B</strong> inside of <strong>A</strong>.",
        examples: [
            '<strong>jedi luke</strong> selects all <tag>luke</tag> elements that are inside of any <tag>jedi</tag>',
            '<strong>#slug windu</strong> selects any <tag>windu</tag> elements that are inside of the element with <strong>id="slug"</strong>',
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
        syntax: "#id  A",
        help: 'You can combine any selector with the descendent selector.',
        examples: [
            '<strong>#big chewie</strong> selects all <tag>chewie</tag> elements that are inside of elements with <strong>id="big"</strong>'
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
            '<strong>.jedi</strong> selects all elements with <strong>class="jedi"</strong>'
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
            '<strong>stormtrooper.strong</strong> selects all <tag>stormtrooper</tag> elements that have <strong>class="strong"</strong>',
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
        syntax: "Your selector",
        helpTitle: "You can do it",
        help: 'Combine what you learned in the last few levels to solve this one.',
        examples: [
            'Not this time.',
        ],
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
        helpTitle: "Combine, selectors, with commas",
        syntax: "A, B",
        help: 'This selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
        examples: [
            '<strong>vader, .jedi</strong> selects all <tag>vader</tag> elements as well as all elements with <strong>class="jedi"</strong>',
        ],
        boardMarkup: `
        <luke></luke>
        <luke class="small"></luke>
        <luke class="small"></luke>
        <vader></vader>
        <bb-8></bb-8>
        <bb-8 class="small"></bb-8>    
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
            '<strong>jedi *</strong> selects any element inside all <tag>jedi</tag> elements.',
        ],
        boardMarkup: `
    <chewie class="small"></chewie>
    <leia class="small"></leia>
    <millenium-falcon></millenium-falcon>
    <vader></vader>
    <stormtrooper id="slug"></stormtrooper>
`
    },
    {
        doThis: "Select everybody on the Millenium-falcons",
        selector: "millenium-falcon *",
        syntax: "A *",
        helpTitle: "Combine the Universal Selector",
        help: 'This selects all elements inside of <strong>A</strong>.',
        examples: [
            '<strong>stormtrooper.weak *</strong> selects every element inside all <tag>stormtrooper class="weak"</tag> elements.'
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
    <bb-8 class="small"></bb-8>    
`
    },
];

export const MIN_LEVEL = 0;

// eslint-disable-next-line no-magic-numbers
export const MAX_LEVEL = levels.length - 1;
export const LEVEL_STEP = 1;
