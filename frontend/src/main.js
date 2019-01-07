import * as Matter from 'matter-js';

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

var NUMBER_OF_BODIES = 10;
var bodyStyle = { fillStyle: '#0000FF' };
var bodies = Array(NUMBER_OF_BODIES).fill().map(() => {
  var size = Common.random(10, 20);
  return Bodies.rectangle(Common.random(0, 800), Common.random(0, 600), size, size, {
    force: {x: (Math.random() - 0.5) / 500, y: (Math.random() - 0.5) / 500 },
    render: bodyStyle
  } );
});

World.add(world, bodies);

Events.on(render, "afterRender", event =>
  document.getElementById("offscreen").innerHTML = bodies.filter(is_off_screen)
                                                         .map(i => i.id)
                                                         .join(', '));

function setPairsColor(color) {
  return event => {
    for (var pair of event.pairs) {
      pair.bodyA.render.fillStyle = color;
      pair.bodyB.render.fillStyle = color;
    }
  }
}

Events.on(engine, 'collisionStart',  setPairsColor('#00FF00'));
Events.on(engine, 'collisionActive', setPairsColor('#FF0000'));
Events.on(engine, 'collisionEnd',    setPairsColor('#0000FF'));

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
Render.lookAt(render, Composite.allBodies(world));
