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