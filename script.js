// console.clear();
const colours = [chroma.scale(['#ffffff', '#e8d8ff', '#cfb2ff', '#b38cff', '#9266ff', '#683eff', '#0000ff']), chroma.scale(['#ffffff', '#e8d8ff', '#cfb2ff', '#b38cff', '#9266ff', '#683eff', '#0000ff']), chroma.scale(['#ffffff', '#e8d8ff', '#cfb2ff', '#b38cff', '#9266ff', '#683eff', '#0000ff']), chroma.scale(['#ffffff', '#e8d8ff', '#cfb2ff', '#b38cff', '#9266ff', '#683eff', '#0000ff'])];
const svgs = document.querySelectorAll('.letter');

const startAnimation =() => {

svgs.forEach((svg) => {
  const paths = svg.querySelectorAll('path');
  const group = svg.querySelector('.group');

  let currentGradient = 1;

  const tl  = gsap.timeline({
    onComplete: () => {
      tl.timeScale(1);
    }
  });

  function generatePoints() {
    tl.clear();
    group.innerHTML = '';
    let delay = 0;

    paths.forEach(path => {
      const length = path.getTotalLength();

      for (let i = 0; i < length; i += 1) {
        const pointLength = i;

        const point = path.getPointAtLength(pointLength);
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', 2.8);
        circle.setAttribute('fill', "#ffffff") // 첫 칼라
        group.appendChild(circle);
        const coloursX = (point.x / 1920) + ((Math.random() - 0.5) * 0.2);

        tl.to(circle, {
          autoRound: false,
          fill: colours[currentGradient % colours.length](coloursX).hex(),
          cx: point.x + (Math.random() - 0.5) * 50,
          cy: point.y + (Math.random() - 0.5) * 50,

          // duration: 'random(0.5, 10)',
          duration: Math.random() * 2 + 1,
          r: Math.random() * 12 + 1,
          ease: 'sine.out',
          fillOpacity: 0
        }, 0);
      }
    });

    tl.delay(1);
    currentGradient++;

  }
  generatePoints();
})
}



startAnimation()