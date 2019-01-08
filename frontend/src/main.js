import * as Matter from 'matter-js';
// import "matter-tools";
import MatterWrap from "matter-wrap";
import Player from './player.js';

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

Matter.use('matter-wrap');
// create engine
var engine = Engine.create({
        // enableSleeping: true
    }),
    world = engine.world;

engine.world.gravity.y = 0;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        // width: 800,
        // height: 600,
        showAngleIndicator: true,
        wireframes: false
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

var is_off_screen = body => body.position.x > 800 ||
    body.position.x < 0 ||
    body.position.y > 600 ||
    body.position.y < 0;

var bodyStyle = {
    fillStyle: '#0000FF',
    lineWidth: 0
};

var wrap = {
    min: {
        x: 100,
        y: 100
    },
    max: {
        x: 500,
        y: 500
    }
};

var create_body = () => {
    var size = 20; //Common.random(10, 20);
    return Bodies.rectangle(Common.random(100, 500), Common.random(100, 500), size, size, {
        force: {
            x: (Math.random() - 0.5) / 500,
            y: (Math.random() - 0.5) / 500
        },
        render: bodyStyle,
        plugin: {
            wrap: wrap
        }
    });
};

var NUMBER_OF_BODIES = 10;
var bodies = Array(NUMBER_OF_BODIES).fill().map(create_body);

World.add(world, bodies);

Events.on(render, "afterRender", event =>
    $("#offscreen").innerHTML = bodies.filter(is_off_screen).map(i => i.id).join(', '));

var setPairsColor = color => event => {
    for (var pair of event.pairs) {
        pair.bodyA.render.fillStyle = color;
        pair.bodyB.render.fillStyle = color;
    }
};

Events.on(engine, 'collisionStart', setPairsColor('#00FF00'));
Events.on(engine, 'collisionActive', setPairsColor('#FF0000'));
Events.on(engine, 'collisionEnd', setPairsColor('#0000FF'));

Events.on(engine, 'collisionStart', event => {
    for (var pair of event.pairs) {
        // Body.setVelocity(pair.bodyA, {
        //     x: 0,
        //     y: 0
        // });
        // Body.setVelocity(pair.bodyB, {
        //     x: 0,
        //     y: 0
        // });
    }
});

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
// Render.lookAt(render, Composite.allBodies(world));
