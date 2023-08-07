var side,
    movingRight,
    max = 0,
    ghost = document.getElementById('_02-ghost');
 
atBounds = () => {
  if (movingRight) {
    if (ghost.getBoundingClientRect().right >= max) {
      return true;
    }
  } else {
    if (ghost.getBoundingClientRect().left <= max) {
      return true;
    }
  }
  return false;
}

move = () => setTimeout(() => {
  if (!atBounds()) {
    ghost.style.left = String((parseInt(ghost.style.left) || 0) + side) + 'px';
  }
  if (side > 0) {
    ghost.style.transform = 'rotateY(180deg)';
    ghost.style.transformOrigin = '50% 50%';
  } else {
    ghost.style.transform = 'rotateY(0deg)';
    ghost.style.transformOrigin = '0% 0%';
  }
  move();
}, 10);

document.onmousemove = e => {
  movingRight = e.screenX > (window.innerWidth / 2);
  max = e.screenX;

  if (atBounds()) {
    side = 0;
    return;
  }

  side = e.screenX > (window.innerWidth / 2) ? 2 : -2;
}

move();

tday  =new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

function GetClock(){
d = new Date();
nday   = d.getDay();
nmonth = d.getMonth();
ndate  = d.getDate();
nyear = d.getYear();
nhour  = d.getHours();
nmin   = d.getMinutes();
nsec   = d.getSeconds();

if(nyear<1000) nyear=nyear+1900;

     if(nhour ==  0) {ap = " AM";nhour = 00;} 
else if(nhour <= 11) {ap = " AM";} 
else if(nhour == 12) {ap = " PM";} 
else if(nhour >= 13) {ap = " PM";nhour -= 00;}

if(nmin <= 9) {nmin = "0" +nmin;}
if(nsec <= 9) {nsec = "0" +nsec;}


document.getElementById('clockbox').innerHTML="Welcome to "+tday[nday]+", "+ndate+" "+tmonth[nmonth]+" "+nyear+ " at " + nhour + ":" + nmin + ":" + nsec + ap;
setTimeout("GetClock()", 1000);
}
window.onload=GetClock;

function _classPrivateMethodGet(receiver, privateSet, fn) {if (!privateSet.has(receiver)) {throw new TypeError("attempted to get private field on non-instance");}return fn;}function _classPrivateFieldGet(receiver, privateMap) {var descriptor = privateMap.get(receiver);if (!descriptor) {throw new TypeError("attempted to get private field on non-instance");}if (descriptor.get) {return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateFieldSet(receiver, privateMap, value) {var descriptor = privateMap.get(receiver);if (!descriptor) {throw new TypeError("attempted to set private field on non-instance");}if (descriptor.set) {descriptor.set.call(receiver, value);} else {if (!descriptor.writable) {throw new TypeError("attempted to set read only private field");}descriptor.value = value;}return value;}const { anime } = window;

class Utils {
  static get1em(element) {
    return parseFloat(
    window.getComputedStyle(element).
    getPropertyValue('font-size'));

  }}var _root = new WeakMap();var _elements = new WeakMap();var _options = new WeakMap();var _isAnimating = new WeakMap();var _updateSize = new WeakSet();

class Counter {
  constructor(options) {_updateSize.add(this);_root.set(this, { writable: true, value: void 0 });_elements.set(this, { writable: true, value: void 0 });_options.set(this, { writable: true, value: void 0 });_isAnimating.set(this, { writable: true, value: void 0 });
    _classPrivateFieldSet(this, _root, options.root);
    _classPrivateFieldSet(this, _elements, {
      svg: _classPrivateFieldGet(this, _root).querySelector('.svgline'),
      path: _classPrivateFieldGet(this, _root).querySelector('.svgpath'),
      number: _classPrivateFieldGet(this, _root).querySelector('.number') });

    _classPrivateFieldSet(this, _options, options);
    _classPrivateFieldSet(this, _isAnimating, false);
  }

  animate(options) {
    if (_classPrivateFieldGet(this, _isAnimating)) {
      return;
    }

    _classPrivateMethodGet(this, _updateSize, _updateSize2).call(this);

    const { start, end } = options;
    const units = options.units || '';
    const duration = options.duration || 1000;
    const delay = options.delay || 0;
    const numberOfLaps = options.numberOfLaps || 3;
    const length = _classPrivateFieldGet(this, _elements).path.getTotalLength();
    const startDasharray = `${length} 0`;
    const endDasharray = `0 ${length}`;
    const startDashoffset = numberOfLaps * length;

    _classPrivateFieldGet(this, _elements).path.style.strokeDasharray = startDasharray;
    _classPrivateFieldGet(this, _elements).path.style.strokeDashoffset = startDashoffset;
    _classPrivateFieldGet(this, _elements).number.innerHTML = `${start}${units}`;

    anime({
      targets: _classPrivateFieldGet(this, _root),
      opacity: [0, 1],
      duration: 500,
      easing: 'easeInCubic',
      complete: () => {
        setTimeout(() => {
          anime({
            targets: _classPrivateFieldGet(this, _elements).path,
            strokeDasharray: [startDasharray, endDasharray],
            strokeDashoffset: [startDashoffset, 0],
            duration,
            easing: 'linear',
            update: anim => {
              if (anim.progress <= 0) {
                return;
              }

              const progress = anim.progress / 100;
              const number = Math.ceil(start + (end - start) * progress);

              _classPrivateFieldGet(this, _elements).number.innerHTML = `${number}${units}`;
            },
            complete: () => {
              anime({
                targets: _classPrivateFieldGet(this, _root),
                opacity: [1, 0],
                duration: 300,
                delay: 500,
                easing: 'easeOutCubic',
                complete: () => {
                  _classPrivateFieldSet(this, _isAnimating, false);

                  if (typeof options.callback === 'function') {
                    options.callback();
                  }
                } });

            } });

        }, delay);
      } });


    _classPrivateFieldSet(this, _isAnimating, true);
  }}var _updateSize2 = function _updateSize2() {const rect = _classPrivateFieldGet(this, _root).getBoundingClientRect();const { width, height } = rect;const em = Utils.get1em(_classPrivateFieldGet(this, _root));const strokeWidth = (_classPrivateFieldGet(this, _options).lineWidth || 0.3) * em;const radius = (_classPrivateFieldGet(this, _options).radius || 0) * em;const a = (_classPrivateFieldGet(this, _options).triangleSize || 0) * em;const viewBox = `
            ${-strokeWidth / 2}
            ${-strokeWidth / 2}
            ${rect.width + strokeWidth}
            ${rect.height + strokeWidth}`;const d = `
            M ${width / 2} ${a}
            L ${width / 2 + a} 0
            L ${width - radius} 0
            A ${radius} ${radius} 0 0 1 ${width} ${radius}
            L ${width} ${height / 2 - a}
            L ${width - a} ${height / 2}
            L ${width} ${height / 2 + a}
            L ${width} ${height - radius}
            A ${radius} ${radius} 0 0 1 ${width - radius} ${height}
            L ${width / 2 + a} ${height}
            L ${width / 2} ${height - a}
            L ${width / 2 - a} ${height}
            L ${radius} ${height}
            A ${radius} ${radius} 0 0 1 0 ${height - radius}
            L 0 ${height / 2 + a}
            L ${a} ${height / 2}
            L 0 ${height / 2 - a}
            L 0 ${radius}
            A ${radius} ${radius} 0 0 1 ${radius} 0
            L ${width / 2 - a} 0
            Z`;_classPrivateFieldGet(this, _elements).svg.setAttribute('viewBox', viewBox);_classPrivateFieldGet(this, _elements).path.setAttribute('stroke-width', strokeWidth);_classPrivateFieldGet(this, _elements).path.setAttribute('d', d);};function main() {const root = document.getElementById('counter');const counter = new Counter({ root, lineWidth: 0.3, triangleSize: 0.5, radius: 0.3 });const animate = () => {counter.animate({ start: 0, end: 100, units: '%', duration: 5000, delay: 500, numberOfLaps: 3, callback: () => {setTimeout(animate, 1000);} });};

  animate();
}

document.addEventListener('DOMContentLoaded', main);