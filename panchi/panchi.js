
function panchiMain() {
  'use strict';
  var panchi = (function () {
    var $p = {},
        maindiv = document.getElementById('panchi'),
        MAIN_RADIUS = 300,
        POST_RADIUS = 8,
        POST_BORDER_THICKNESS = POST_RADIUS / 4,
        RING_THICKNESS = POST_RADIUS,
        INNER_RING_RADIUS = MAIN_RADIUS * 0.3,
        OUTER_RING_RADIUS = MAIN_RADIUS * 0.6,
        INNER_RING_POSTS = 24,
        ISLAND_FREQUENCY = 6,
        originX = MAIN_RADIUS,
        originY = MAIN_RADIUS;
    
    function placeChild(childElement, x, y) {
      if (!childElement instanceof window.HTMLElement) {
        return;
      }

      maindiv.appendChild(childElement);
      var offsetX = childElement.offsetWidth / 2,
          offsetY = childElement.offsetHeight / 2;
      childElement.style.left = (originX - offsetX) + x;
      childElement.style.top = (originY - offsetY) + y;
    }
    
    function createCircle(radius, styling) {
      var circle = document.createElement('div');
      circle.className = 'panchibase';
      circle.style.width = radius * 2;
      circle.style.height = radius * 2;
      styling(circle);

      return circle;
    }
    
    $p.setup = function () {
      placeChild(createCircle(INNER_RING_RADIUS, function(elem) {
        elem.style.borderWidth = RING_THICKNESS;
        elem.style.borderStyle = 'solid';
        elem.style.borderColor = 'rgba(51, 153, 255, 0.5)';
      }), 0, 0);
      placeChild(createCircle(OUTER_RING_RADIUS, function(elem) {
        elem.style.borderWidth = RING_THICKNESS;
        elem.style.borderStyle = 'solid';
        elem.style.borderColor = 'rgba(51, 153, 255, 0.5)';
      }), 0, 0);
      
      for (var i = 0; i < INNER_RING_POSTS; i++) {
        var spacing = (2 * Math.PI / INNER_RING_POSTS),
            isIsland = (i % ISLAND_FREQUENCY == 0),
            circle = createCircle(POST_RADIUS, function(elem) {
              elem.style.borderWidth = POST_BORDER_THICKNESS * (isIsland ? 2 : 1);
              elem.style.borderStyle = 'solid';
              elem.style.borderColor = '#3399FF';
              elem.style.backgroundColor = 'white';
            }),
            theta = i * spacing,
            postX = (INNER_RING_RADIUS + RING_THICKNESS / 2) * Math.cos(theta),
            postY = (INNER_RING_RADIUS + RING_THICKNESS / 2) * Math.sin(theta);
        
        placeChild(circle, postX, postY);
      }
    };
    
    return $p;
  }());
  
  panchi.setup();
}

window.addEventListener('load', panchiMain);
