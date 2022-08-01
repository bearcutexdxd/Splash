function resetCountersOverflow(animationArg, animationFrame) {
  const animation = animationArg;

  if (animation.counter1 > animationFrame) {
    animation.counter1 = 0;
  } else if (animation.counter2 > animationFrame) {
    animation.counter2 = 0;
  } else if (animation.counter3 > animationFrame) {
    animation.counter3 = 0;
  } else if (animation.counter4 > animationFrame) {
    animation.counter4 = 0;
  }

  return animation;
}

module.exports = { resetCountersOverflow };
